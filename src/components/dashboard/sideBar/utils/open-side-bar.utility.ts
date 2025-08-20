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
