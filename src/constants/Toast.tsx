import { toast } from "react-toastify";
import {ReactComponent as SuccessIcon} from "assets/icons/check-circle.svg";
import {ReactComponent as FailureIcon} from "assets/icons/toast-error.svg";
import {ReactComponent as WarningIcon} from "assets/icons/warn-toast.svg";

const SuccessToast =  {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 3000,
    className: "toast-message !bg-greenSuccess",
    closeButton:false,
    icon: <SuccessIcon/>,
    hideProgressBar:true,
  };

  const ErrorToast =  {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 3000,
    className: "toast-message !bg-redError",
    closeButton:false,
    icon: <FailureIcon/>,
    hideProgressBar:true,
  };

  const WarnToast ={
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 3000,
    className: "toast-message !bg-orangeWarn",
    closeButton:false,
    icon: <WarningIcon/>,
    hideProgressBar:true,
  }

  export{SuccessToast,ErrorToast,WarnToast}