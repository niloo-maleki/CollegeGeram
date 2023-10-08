import { ReactComponent as Info } from "assets/icons/info.svg";
import profile from "assets/images/profile.png";
import { API_IMAGE } from "features/api/apiSlice";
import { useNavigate } from "react-router-dom";

export interface IList {
  userImage?: string;
  userName?: string;
  fullName?: string;
}
const Lists = (props: IList) => {
  const { userImage, userName, fullName } = props;
  const navigate = useNavigate();
  const handleNavigatetoProfile = () => {
    navigate(`../../collegueGram/friendPage/${userName}`, {
      state: {userName: userName },
    });
  };

  return (
    <div className="flex items-start justify-between">
      <div className="flex justify-between items-center w-full ">
        <div className="flex justify-center gap-2 items-center">
          <div className="flex rounded-full w-16">
            <img
              src={userImage ? `${API_IMAGE}${userImage}` : profile}
              alt="frindsProfile"
              className="aspect-square object-cover rounded-full w-full"
            />
          </div>
          <div className="flex flex-col items-center">
            <span>{userName}</span>
            <span>{fullName}</span>
          </div>
        </div>
        <div>
          <Info onClick={handleNavigatetoProfile} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Lists;
