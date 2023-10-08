import Button from "components/Button";
import { EFollowNotification } from "types/interface";
import { API_IMAGE } from "features/api/apiSlice";
import profile from "assets/images/profile.png";
import {
  useAcceptFollowUserMutation,
  useDenyFollowUserMutation,
  useFollowUserMutation,
} from "features/follow/followApi";
import { timeSince, aDay } from "constants/helpers/timeConverter";
import { useState } from "react";
import { buttontext } from "pages/dashborad/friendPage/components/FriendProfile";

export interface IMyNotif {
  subject: "follow" | "post-like" | "comment";
  type?: EFollowNotification;
  userImg?: string;
  notifText?: string;
  time?: string;
  buttonText?: string;
  userId?: number;
}

const convertNotifications = (notif: any): IMyNotif[] => {
  const newNotifications: any = notif.map((notification: any) => {
    if (notification.subject === "follow") {
      if (notification.type === EFollowNotification.FOLLOWED) {
        return {
          subject: "follow",
          type: EFollowNotification.FOLLOWED,
          userImg: notification.profilePicture,
          notifText: `${notification.displayName} دنبالت کرد`,
          time: timeSince(aDay, new Date(notification.createdAt)),
          buttonText: "دنبال کردن",
          userId: notification.userId,
        };
      } else if (notification.type === EFollowNotification.FOLLOW_ACCEPTED) {
        return {
          subject: "follow",
          type: EFollowNotification.FOLLOW_REQUESTED,
          userImg: notification.profilePicture,
          notifText: `${notification.displayName} به شما درخواست دوستی داده است.`,
          time: timeSince(aDay, new Date(notification.createdAt)),
          buttonText: "لغو درخواست",
        };
      } else if (notification.type === EFollowNotification.FOLLOW_REQUESTED) {
        return {
          subject: "follow",
          type: EFollowNotification.FOLLOW_ACCEPTED,
          userImg: notification.profilePicture,
          notifText: `${notification.displayName} درخواست دوستی شما رو قبول کرد`,
          time: timeSince(aDay, new Date(notification.createdAt)),
          userId: notification.userId,
        };
      }
      return undefined;
    } else if (notification.subject === "post-like") {
      return {
        subject: "post-like",
        userImg: notification?.postDetail?.postImage,
        notifText: `${notification.userDetails.displayName} این عکس رو لایک کرده`,
        time: timeSince(aDay, new Date(notification.createdAt)),
      };
    } else if (notification.subject === "comment") {
      return {
        subject: "comment",
        userImg: notification?.postDetail?.postImage,
        notifText: `${notification.userDetail.displayName} برای این عکس کامنت داده`,
        time: timeSince(aDay, new Date(notification.createdAt)),
      };
    }

    return undefined;
  });

  return newNotifications;
};

const MyNotif = (props: any) => {
  const [followUser] = useFollowUserMutation();
  const [denyFollowReq] = useDenyFollowUserMutation();
  const [accepteFollowUser] = useAcceptFollowUserMutation();
  const [buttonText, setButtonText] = useState<buttontext>();
  const clickHandler = (
    type: EFollowNotification,
    userId: number,
    item: any
  ) => {
    console.log("item", item);
    switch (type) {
      case "followed":
        followUserFunc(userId);
        break;
      case "follow-request":
        denyFollowRequest(userId);
        break;
      case "follow-accepted":
        accepteFollowUser({ userId });
        break;
    }
  };

  const followUserFunc = (userId: number) => {
    followUser({ userId });
  };

  const denyFollowRequest = (userId: number) => {
    denyFollowReq({ userId });
  };

  if (props.selfNotificationData === undefined) return <></>;

  const convertedNotifications: any[] = convertNotifications(
    props.selfNotificationData
  );
  return (
    <div className="flex flex-col gap-9">
      {convertedNotifications.map((item, index) => (
        <div key={index} className="flex gap-36 items-center">
          <div className="flex items-center gap-5">
            <div className="flex w-12 items-start justify-center aspect-square">
              <img
                className="aspect-square object-cover rounded-full w-full"
                src={item.userImg ? API_IMAGE + item.userImg : profile}
                alt="userImg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">{item.notifText}</p>
              <span className="text-xs font-normal">{item.time}</span>
            </div>
          </div>
          <div className="flex items-center">
            {item.buttonText && (
              <Button
                buttonText={item.buttonText}
                onClick={() => clickHandler(item.type, item.userId, item)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyNotif;
