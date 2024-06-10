import {RhinoManager,RhinoErrors, RhinoInference} from '@picovoice/rhino-react-native';

export class VoiceCommend {
    setCommend = null;
    _rhinoManager = null;
    async _makeManager() {
        try {
        _rhinoManager = await RhinoManager.create(
            "DA65/MZtTShRD/Xeg1urVJu5qw0w3OyboQtYyAxz01UWjXRrw/P7sw==",
            "VoiceModel/CookPalComand_ko_android_v3_0_0.rhn",
            this.inferenceCallback.bind(this),
            (error) => {
            this.errorCallback(error.message);
            },
            "VoiceModel/rhino_params_ko.pv",
        );
        console.log(this._rhinoManager)
        } catch (err) {
        let errorMessage;
        if (err instanceof RhinoErrors.RhinoInvalidArgumentError) {
            errorMessage = err.message;
        } else if (err instanceof RhinoErrors.RhinoActivationError) {
            errorMessage = 'AccessKey activation error';
        } else if (err instanceof RhinoErrors.RhinoActivationLimitError) {
            errorMessage = 'AccessKey reached its device limit';
        } else if (err instanceof RhinoErrors.RhinoActivationRefusedError) {
            errorMessage = 'AccessKey refused';
        } else if (err instanceof RhinoErrors.RhinoActivationThrottledError) {
            errorMessage = 'AccessKey has been throttled';
        } else {
            errorMessage = err.toString();
        }
        this.errorCallback(errorMessage);
        }
    }

    inferenceCallback(inference) {
        if(inference.isUnderstood){
            setCommend(inference.intent)
        }
    }

    errorCallback(error) {
        console.log(error)
    }

    componentWillUnmount() {
        _rhinoManager?.delete();
    }

    async _startProcessing(getCommend) {
        setCommend = getCommend;
        try {
            await _rhinoManager?.process();
        } catch (e) {}
    }

}

