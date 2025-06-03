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

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async readAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
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
      statusCode: 200,
      statusMessage: StatusMessage.OK,
      message: {
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
          message: null,
        }),
      );
    }

    return returnMessage({
      statusCode: 200,
      statusMessage: StatusMessage.OK,
      message: { user },
    });
  }

  // ----------------------------------------------------------------------
  async create(data: CreateUserDto) {
    try {
      const userCreated = await this.prisma.user.create({ data });
      return returnMessage({
        ok: true,
        statusCode: 201,
        statusMessage: StatusMessage.CREATED,
        message: userCreated,
      });
    } catch (e) {
      if (e.code === "P2002") {
        throw new ConflictException(
          returnMessage({
            ok: false,
            statusCode: 409,
            statusMessage: StatusMessage.CONFLICT,
            message: "User e-mail is already in use",
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
      const userUpdated = await this.prisma.user.update({
        where: { id },
        data,
      });

      return returnMessage({
        statusCode: 200,
        statusMessage: StatusMessage.OK,
        message: { user: userUpdated },
      });
    } catch (e) {
      console.error(e);
      throw new NotFoundException(
        returnMessage({
          ok: false,
          statusCode: 404,
          statusMessage: StatusMessage.NOT_FOUND,
          message: null,
        }),
      );
    }
  }

  // ----------------------------------------------------------------------
  async put(id: string, data: PutUserDto) {
    try {
      const userUpdated = await this.prisma.user.update({
        where: { id },
        data,
      });

      return returnMessage({
        statusCode: 200,
        statusMessage: StatusMessage.OK,
        message: { user: userUpdated },
      });
    } catch (e) {
      console.error(e);
      throw new NotFoundException(
        returnMessage({
          ok: false,
          statusCode: 404,
          statusMessage: StatusMessage.NOT_FOUND,
          message: null,
        }),
      );
    }
  }

  // ----------------------------------------------------------------------
  async delete(id: string) {
    const userDeleted = await this.prisma.user.delete({ where: { id } });
    return returnMessage({
      statusCode: 200,
      statusMessage: StatusMessage.OK,
      message: { user: userDeleted },
    });
  }

  // ----------------------------------------------------------------------
  async deleteMany(ids: string[]) {
    const usersDeleted = await this.prisma.user.deleteMany({
      where: { id: { in: ids } },
    });
    const { count } = usersDeleted;
    return returnMessage({
      statusCode: 200,
      statusMessage: StatusMessage.OK,
      message: {
        usersDeleted: count,
      },
    });
  }
}
