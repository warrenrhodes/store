import { pathOr } from 'ramda';
import React from 'react';

import { shoes } from '@/data/content';

import SectionMoreProducts from './SectionMoreProducts';
import SectionNavigation from './SectionNavigation';
import SectionProductHeader from './SectionProductHeader';
import SectionProductInfo from './SectionProductInfo';

type Props = {
  params: { productId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const getProductData = async (id: string) => {
  const filteredDestination = shoes.find((item) => item.slug === id);
  return filteredDestination;
};

const SingleProductPage = async (props: Props) => {
  const selectedProduct = await getProductData(props.params.productId);

  return (
    <div className="container">
      <SectionNavigation />

      <div className="mb-20">
        <SectionProductHeader
          shots={pathOr([], ['shots'], selectedProduct)}
          shoeName={pathOr('', ['shoeName'], selectedProduct)}
          prevPrice={pathOr(0, ['previousPrice'], selectedProduct)}
          currentPrice={pathOr(0, ['currentPrice'], selectedProduct)}
          rating={pathOr(0, ['rating'], selectedProduct)}
          pieces_sold={pathOr(0, ['pieces_sold'], selectedProduct)}
          reviews={pathOr(0, ['reviews'], selectedProduct)}
        />
      </div>

      <div className="mb-28">
        <SectionProductInfo
          overview={pathOr('', ['overview'], selectedProduct)}
          shipment_details={pathOr([], ['shipment_details'], selectedProduct)}
          ratings={pathOr(0, ['rating'], selectedProduct)}
          reviews={pathOr(0, ['reviews'], selectedProduct)}
        />
      </div>

      <div className="mb-28">
        <SectionMoreProducts />
      </div>
    </div>
  );
};

export default SingleProductPage;
