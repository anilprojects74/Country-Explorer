import React from 'react';
import "./styles.css"

const SkeletonCard = () => {
  return (
    <div className="skel-card">
		<div className="skel-card-img skel-skeleton">
		</div>
		<div className="skel-card-body">
			<h2 className="skel-card-title skel-skeleton">
			</h2>
			<p className="skel-card-intro skel-skeleton">
			</p>
		</div>
	</div>
  );
};

export default SkeletonCard;
