import Shimmer from "./Shimmer"
import SkeletonElement from "./SkeletonElement"

export default function SkeletonProduct({theme}) {
    const themeClass = theme || 'light'

    return (
      <div className={`skeleton-wrapper ${themeClass}`}>
        <div className="skeleton-product">
          <SkeletonElement type="title" />
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
        </div>
        <Shimmer />
      </div>
    )
}
