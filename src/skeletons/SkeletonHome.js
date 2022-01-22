import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

export default function SkeletonHome({ theme }) {
  const themeClass = theme || "light";

  return (
    <div className={`skeleton-wrapper ${themeClass}`}>
      <div className="skeleton-home">
        <SkeletonElement type="title" />
        <SkeletonElement type="title" />
      </div>
      <Shimmer />
    </div>
  );
}
