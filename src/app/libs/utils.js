const isDeveloping = process.env.NODE_ENV === "development";
const ipAddress = isDeveloping ? "192.168.0.104" : "159.65.183.188";
export function stopEvent(e) {
  try {
    e.preventDefault();
  } catch (error) {}
}

export function isOnline() {
  return navigator.onLine;
}

export function goBack() {
  try {
    history.go(-1);
  } catch (error) {
    console.log(error);
  }
  try {
    navigator.app.backHistory();
  } catch (error) {}
}

export const appConfig = {
  APP_NAME: "Logo here",
  BASE_URL: "http://" + ipAddress + ":3001/api"
};

export const formatDate = dateString => {
  console.log("datestring", dateString);
  var date = new Date(dateString);
  date.setDate(date.getDate() + 20);
  console.log(
    "date",
    date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2)
  );
  return (
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2)
  );
};
