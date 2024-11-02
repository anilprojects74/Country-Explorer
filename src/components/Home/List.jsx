import CountryCard from "./CountryCard";
import { Row, Col, Skeleton, Button, Spin } from "antd";
import SkeletonCard from "./SkeletonCard";

export default function List({ data, loading, loadMoreData, loadMoreLoading }) {

  const SkeletonCount = 14

  return (
    <div className="overflow-y-auto" style={{ maxHeight: '70vh', marginTop: '1.5rem' }}>
      <Row gutter={[16, 16]}>
        {
          loading ? 
          Array.from({ length: SkeletonCount }).map((_, index) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={4}>
              <SkeletonCard key={index} />
            </Col>
          ))
          :
          data?.map((item) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={4} key={item?.name?.official}>
              <CountryCard 
                image_url={item?.flags?.png || item?.flags?.svg} 
                title={item?.name?.official} 
                population={item?.population} 
                region={item?.region} 
                capital={item?.capital?.[0]} 
              />
            </Col>
          ))
        }
      </Row>
      {loadMoreLoading && (
        <div className="flex justify-center my-4">
          <Spin />
        </div>
      )}
      {
        !loading && 
        <div className="flex justify-center my-4">
          <Button 
            onClick={loadMoreData} 
            loading={loadMoreLoading} 
            disabled={loadMoreLoading}
            type="link"
            className="font-bold text-xl"
          >
            { loadMoreLoading ? "loading..." : "Load More..." }
          </Button>
      </div>
      }
      
    </div>
  );
}
