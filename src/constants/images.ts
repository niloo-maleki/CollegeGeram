import img1 from "../assets/images/board 3.png";
import img2 from "../assets/images/Rectangle 52.png";
import img3 from "../assets/images/Rectangle 53 (1).png";
import img4 from "../assets/images/Rectangle 53.png";
import img5 from "../assets/images/Rectangle 54 (1).png";
import img6 from "../assets/images/board 10.png";
import img7 from "../assets/images/board 11.png";
import img8 from "../assets/images/pic 1 frame.png";
import img9 from "../assets/images/pic 4 frame.png";
import img10 from "../assets/images/pic 2 frame.png";
import img11 from "../assets/images/board 3.png";
import img12 from "../assets/images/Rectangle 57.png";
import img13 from "../assets/images/Rectangle 58.png";
import img14 from "../assets/images/Rectangle 56.png";
import img15 from "../assets/images/Rectangle 59.png";
import img16 from "assets/images/board 4 (1).png"
import img17 from "assets/images/discover section 2 (1).png"
import img18 from "assets/images/board 5.png"
import { IPostCard } from "pages/homePage/components/PostCard";
import { ICollegueGram } from "pages/explore/Explore";
import frindsProfile from "assets/images/frindsProfile.png";
import frindsProfile2 from "assets/images/frindsProfile2.png";
import { IMyNotif } from "pages/dashborad/userPage/components/MyNotif";

export const Images: string[] = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
];

export const TagsColor = [
  "bg-yellow-500",
  "bg-green-500",
  "bg-pink-400",
  "bg-slate-500",
  "bg-blue-400",
  "bg-orange-500",
  "bg-red-500",
  "bg-blue-300",
  "bg-green-300",
  "bg-sky-400",
];

export const SavePost: string[] = [
  img15,
  img14,
  img13,
  img11,
  img4,
  img8,
  img12,
];

export const FriendPosts :string[] =[
img11,
img2,
img16,
img17,

]
export const PrivatePost :string[] =[
 img18,
 img18,
 img18,
 img18,

]

export const MyNotifs: IMyNotif[] = [
  {
    subject: "follow",
    userImg: frindsProfile,
    notifText: "یاسین اروسخانی درخواست دوستی‌ات رو قبول کرد",
    time: "۳ دقیقه پیش ",
  },
  {
    subject: "follow",
    userImg: frindsProfile2,
    notifText: "متین دهقان دنبالت کرد. ",
    time: "۳ دقیقه پیش ",
    buttonText: "دنبال کردن",
  },
  {
    subject: "follow",
    userImg: img12,
    notifText: "یاسین اروسخانی دنبالت کرد",
    time: "۳ دقیقه پیش ",
    buttonText: "لغو درخواست",
  },
  {
    subject: "post-like",
    userImg: img15,
    notifText: "سیمین سحابی این عکس رو لایک کرده",
    time: "۳ دقیقه پیش ",
  },
  {
    subject: "comment",
    userImg: img13,
    notifText: "سیمین سحابی برای این عکس کامنت داده",
    time: "۳ دقیقه پیش",
  },
];
