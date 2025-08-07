import "./css/skeleton.css";
const Skeleton = ({ className }: { className: string }) => {
  return <span className={`${className} skeleton`}></span>;
};
export default Skeleton;
