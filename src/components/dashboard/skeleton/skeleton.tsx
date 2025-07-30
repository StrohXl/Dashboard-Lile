import "./css/skeleton.css";
const Skeleton = ({ className = "" }) => {
  return <span className={`${className} skeleton`}></span>;
};
export default Skeleton;
