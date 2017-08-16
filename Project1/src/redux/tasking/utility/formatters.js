// const padZero = (value) => {
//     let pad = "00"
//     return pad.substring(0, pad.length - value.toString().length) + value;
// }

export const formatWaitTime = timeStamp =>
  // let dateNow = new Date();
  // let hour = padZero(dateNow.getHours() - timeStamp.getHours());
  // let minutes = padZero(dateNow.getMinutes() - timeStamp.getMinutes());
  // let seconds = padZero(dateNow.getSeconds() - timeStamp.getSeconds());
  // return `${hour}:${minutes}:${seconds}`;

  // todo: get diff b/w now and timestamp and show as 0:00:00

  timeStamp.toLocaleTimeString();
