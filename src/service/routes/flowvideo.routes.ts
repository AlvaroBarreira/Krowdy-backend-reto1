import {Router} from 'restify-router';
import {videoFlowController} from '../controllers/videoflow.controller';

const routerFlowInstance = new Router();


routerFlowInstance.post('/processvideo', async (req, res) => {
  try {
    const {inputvideos} = req.body;
    res.json({inputvideos});
    await videoFlowController.executeProcess(inputvideos);
  } catch (error) {
    let errorMessage = 'Failed to do something exceptional';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.json({success: false, error: true, message: errorMessage});
  }
});


export default routerFlowInstance;
