// export const timeSince = (date: Date, referenceDate: Date): string => {
//   const seconds = Math.floor((referenceDate.getTime() - date.getTime()) / 1000);
//   let interval = seconds / 31536000;

//   if (interval > 1) {
//     return Math.floor(interval) + " سال پیش";
//   }
//   interval = seconds / 2592000;
//   if (interval > 1) {
//     return Math.floor(interval) + " ماه پیش";
//   }
//   interval = seconds / 86400;
//   if (interval > 1) {
//     return Math.floor(interval) + " روز پیش";
//   }
//   interval = seconds / 3600;
//   if (interval > 1) {
//     return Math.floor(interval) + " ساعت پیش";
//   }
//   interval = seconds / 60;
//   if (interval > 1) {
//     return Math.floor(interval) + " دقیقه پیش";
//   } else {
//     return Math.floor(seconds) + " ثانیه پیش";
//   }
// };

// export const aDay = new Date(Date.now() - 24 * 60 * 60 * 1000);

export const timeSince = (date: Date, referenceDate: Date): string => {
  let totalSeconds = Math.floor(
    (date.getTime() - referenceDate.getTime()) / 1000
  );

  let days = Math.floor(totalSeconds / (24 * 3600));
  totalSeconds %= 24 * 3600;
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  totalSeconds %= 60;
  let seconds = totalSeconds;

  return days > 0 ? days + " روز پیش " : hours > 0 ? hours + " ساعت پیش " : minutes > 0 ? minutes + minutes + " دقیقه پیش " : seconds > 0 ? seconds + " ثانیه پیش " : ""

  // return `${days > 0 ? days + " روز " : ""}${
  //   hours > 0 ? hours + " ساعت " : ""
  // }${minutes > 0 ? minutes + " دقیقه " : ""}${
  //   seconds > 0 ? seconds + " ثانیه" : ""
  // }`;
};

export const aDay = new Date();
