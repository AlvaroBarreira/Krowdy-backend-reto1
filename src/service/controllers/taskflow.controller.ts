/* eslint-disable require-jsdoc */
/* eslint-disable eol-last */
/* eslint-disable max-len */
import {ffmpegController} from './ffmpeg.controller';
import {videosourceController} from './videosources.controller';
import {videoStatusController} from './videostatus.controller';


class TASKFLOW {
  async initProcess(inputVideos: string) {
    try {
      const context = {
        userId: '6275bb583af43b4205af521a',
      };

      const inputVideosSrc = await videosourceController.createVideoSource(inputVideos, context);

      await videoStatusController.createVideoStatus(inputVideosSrc._id, context, 'pending');

      let isVideoAvailable = false;
      try {
        await ffmpegController.processVideo(inputVideos, inputVideosSrc.fileSources.tmp, context, inputVideosSrc._id);
      } catch (error) {
        await videoStatusController.createVideoStatus(inputVideosSrc._id, context, 'failed');
        isVideoAvailable = true;
      }
      await videoStatusController.createVideoStatus(inputVideosSrc._id, context, 'completed');
      if (isVideoAvailable) {
        return inputVideosSrc;
      };
      return {};
    } catch (err) {
      throw err;
    }
  }
}

const TaskController = new TASKFLOW();

export {
  TaskController,
};