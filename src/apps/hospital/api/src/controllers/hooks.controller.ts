import { Controller, Inject, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryUploader, CommandBus } from 'core';

@Controller('hooks')
export class HooksController {
  constructor(
    @Inject('COMMAND_BUS') private commandBus: CommandBus,
    @Inject('UPLOADER_SERVICE') private uploader: CloudinaryUploader,
  ) {}

  @Post('cloudinary')
  @UseInterceptors(FileInterceptor('file'))
  async cloudinaryHook(@UploadedFile() file: Express.Multer.File) {
    return await this.uploader.upload(file.buffer, file.filename);
  }
}
