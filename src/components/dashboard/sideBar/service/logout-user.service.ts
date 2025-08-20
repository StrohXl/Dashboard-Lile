import axios from "axios";

export const logoutUser = async () => {
  try {
    await axios.get("/api/logout");
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
};
