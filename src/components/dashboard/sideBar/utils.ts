import axios from "axios";

export const logoutUser = async () => {
  try {
    await axios.get("/api/logout");
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
};

export const openSideBar = ({
  setOpen,
  showLogo,
  setShowLogo,
  open,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  showLogo: boolean;
  setShowLogo: (value: boolean) => void;
}) => {
  setOpen(!open);
  if (showLogo) {
    setShowLogo(!showLogo);
  } else {
    setTimeout(() => setShowLogo(!showLogo), 200);
    document.cookie = `openSideBar=false;path=/`;
  }
  document.cookie = `openSideBar=${!open};path=/`;
};

export const closeSideBar = ({
  setOpen,
  setShowLogo,
}: {
  setOpen: (value: boolean) => void;
  setShowLogo: (value: boolean) => void;
}) => {
  setOpen(false);
  setShowLogo(false);
  document.cookie = `openSideBar=false;path=/`;
};
