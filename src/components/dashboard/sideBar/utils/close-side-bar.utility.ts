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
