import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PatchUserDto } from "./dto/patch-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { StatusMessage } from "utils/enums/StatusMessage";
import { returnMessage } from "utils/helpers/returnMessage";
import { PutUserDto } from "./dto/put-user.dto";
import * as bcrypt from "bcrypt";

async function hashPassword(password: string | undefined) {
  if (!password) return;
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async readAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        password: true,
        profiles: {
          select: {
            id: true,
            profileName: true,
          },
        },
      },
      take: 10,
    });

    const count = users.length;

    return returnMessage({
      data: {
        count,
        users,
      },
    });
  }

  // ----------------------------------------------------------------------
  async read(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        profiles: {
          select: {
            id: true,
            profileName: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(
        returnMessage({
          ok: false,
          statusCode: 404,
          statusMessage: StatusMessage.NOT_FOUND,
          data: null,
        }),
      );
    }

    return returnMessage({
      data: { user },
    });
  }

  // ----------------------------------------------------------------------
  async create(data: CreateUserDto) {
    try {
      data.password = await hashPassword(data.password);

      const user = await this.prisma.user.create({ data });

      return returnMessage({
        ok: true,
        statusCode: 201,
        statusMessage: StatusMessage.CREATED,
        data: {
          user,
        },
      });
    } catch (e) {
      if (e.code === "P2002") {
        // "User e-mail is already in use"
        throw new ConflictException(
          returnMessage({
            ok: false,
            statusCode: 409,
            statusMessage: StatusMessage.CONFLICT,
            data: null,
          }),
        );
      }

      console.error(e);

      throw new Error(e); // TODO: incomplete
    }
  }

  // ----------------------------------------------------------------------
  async patch(id: string, data: PatchUserDto) {
    try {
      if (data.password) data.password = await hashPassword(data.password);

      const userUpdated = await this.prisma.user.update({
        where: { id },
        data,
      });

      return returnMessage({
        data: { user: userUpdated },
      });
    } catch (e) {
      console.error(e);
      throw new NotFoundException(
        returnMessage({
          ok: false,
          statusCode: 404,
          statusMessage: StatusMessage.NOT_FOUND,
          data: null,
        }),
      );
    }
  }

  // ----------------------------------------------------------------------
  async put(id: string, data: PutUserDto) {
    try {
      data.password = await hashPassword(data.password);

      const userUpdated = await this.prisma.user.update({
        where: { id },
        data,
      });

      return returnMessage({
        data: { user: userUpdated },
      });
    } catch (e) {
      console.error(e);
      throw new NotFoundException(
        returnMessage({
          ok: false,
          statusCode: 404,
          statusMessage: StatusMessage.NOT_FOUND,
          data: null,
        }),
      );
    }
  }

  // ----------------------------------------------------------------------
  async delete(id: string) {
    const userDeleted = await this.prisma.user.delete({ where: { id } });
    return returnMessage({
      data: { user: userDeleted },
    });
  }

  // ----------------------------------------------------------------------
  // async deleteMany(ids: string[]) {
  //   const usersDeleted = await this.prisma.user.deleteMany({
  //     where: { id: { in: ids } },
  //   });
  //   const { count } = usersDeleted;
  //   return returnMessage({
  //     data: {
  //       usersDeleted: count,
  //     },
  //   });
  // }
}
