import { useEffect, useState } from "react";

import { ContainerCard } from "@/components/ui/containerCard";
import SearchInput from "@/components/ui/searchInput";
import { PRODUCTS_MOCK } from "@/constants/salesPoint/mock";
import { useSalesPoint } from "@/hooks/useSalesPoint";
import { Product as ProductType } from "@/types/salesPoint";

import { ProductCard } from "../../Desktop/order/components/ProductCard";
import useSalesPointState from "../../states/sales-point-state";
import { CartResume } from "./components/cartResume";
import { CategoryCard } from "./components/categories/categoryCard";

export const Order = () => {
  const [items, setItems] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [indexCategorySelected, setIndexCategorySelected] =
    useState<number>(-1);
  const [categorySelected, setCategorySelected] = useState<string>("");
  const [products, setProducts] = useState<ProductType[]>(PRODUCTS_MOCK);
  const [filteredProducts, setFilteredProducts] =
    useState<ProductType[]>(PRODUCTS_MOCK);
  const [categories, setCategorires] = useState<string[]>([""]);
  const [productSelected, setProductSelected] = useState<number>(-1);

  const { updateProduct, paymentStep, setPaymentStep } = useSalesPointState();
  const { GetDataProducts } = useSalesPoint();

  const handleAddProduct = () => {
    const productToAdd = [...filteredProducts][productSelected];
    const productCheckout = { ...productToAdd, amount: items };
    updateProduct(productCheckout);
  };

  const handleGetProducts = async () => {
    const productsReponse = await GetDataProducts();
    if (!productsReponse) return;

    const uniqueCategories = productsReponse
      .map((product) => product.category)
      .filter((value, index, array) => {
        return array.indexOf(value) === index;
      });

    setProducts(productsReponse);
    setFilteredProducts(productsReponse);
    setCategorires(uniqueCategories);
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  useEffect(() => {
    if (paymentStep === 4) {
      handleGetProducts();
      setPaymentStep(1);
    }
  }, [paymentStep]);

  useEffect(() => {
    if (!categories) return;

    setCategorySelected(categories[indexCategorySelected]);
    setSearchValue("");
    setProductSelected(-1);
  }, [indexCategorySelected]);

  useEffect(() => {
    if (indexCategorySelected === -1) {
      setFilteredProducts(products);
      return;
    }

    const newProducts = [...products].filter(
      (product) => product.category === categorySelected
    );
    setFilteredProducts(newProducts);
  }, [categorySelected]);

  useEffect(() => {
    setProductSelected(-1);
    if (!searchValue && !categorySelected) {
      setFilteredProducts(products);
      return;
    }

    if (!searchValue) {
      const newProducts = [...products].filter(
        (product) => product.category === categorySelected
      );
      setFilteredProducts(newProducts);
      return;
    }

    const newProducts = [...filteredProducts].filter((product) =>
      product.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
    setFilteredProducts(newProducts);
  }, [searchValue]);

  return (
    <div className="grid gap-4">
      {/* Categorias */}
      <ContainerCard>
        <div className="flex gap-4 p-6">
          <CategoryCard
            name="Todo"
            index={-1}
            setCategorySelected={setIndexCategorySelected}
            isSelected={indexCategorySelected === -1}
            key={`CategoryCard_all`}
          />
          {categories.map((category, index) => (
            <CategoryCard
              name={category}
              index={index}
              setCategorySelected={setIndexCategorySelected}
              isSelected={indexCategorySelected === index}
              key={`CategoryCard_${index}`}
            />
          ))}
        </div>
      </ContainerCard>
      <CartResume />
      {/* Productos */}
      <ContainerCard>
        <div className="flex flex-col gap-2 text-black p-2">
          <div className="w-full">
            <SearchInput value={searchValue} setValue={setSearchValue} />
          </div>
          <div className="flex flex-col items-center sm:grid sm:grid-cols-2 gap-x-2 gap-y-4 py-2 max-h-[44rem] overflow-y-scroll">
            {filteredProducts.length > 0 &&
              filteredProducts.map((product, index) => (
                <ProductCard
                  key={`product_card_${product.id}`}
                  product={product}
                  index={index}
                />
              ))}
          </div>
        </div>
      </ContainerCard>
    </div>
  );
};
