import { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";

import { ContainerCard } from "@/components/ui/containerCard";
import SearchInput from "@/components/ui/searchInput";
import { PRODUCTS_MOCK } from "@/constants/salesPoint/mock";
import { db } from "@/services/firebase";
import { Product as ProductType } from "@/types/salesPoint";

import useSalesPointState from "../states/sales-point-state";
import { CategoryCard } from "./components/categories/categoryCard";
import { AddItems } from "./components/items/addItems";
import { Product } from "./components/products";

export const Order = () => {
  const [items, setItems] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [indexCategorySelected, setIndexCategorySelected] =
    useState<number>(-1);
  const [categorySelected, setCategorySelected] = useState<string>("");
  const [products, setProducts] = useState<ProductType[]>(PRODUCTS_MOCK);
  const [filteredProducts, setFilteredProducts] =
    useState<ProductType[]>(PRODUCTS_MOCK);
  const [categories, setCategorires] = useState<string[]>(["Mock Cateogry"]);
  const [productSelected, setProductSelected] = useState<number>(-1);

  const { updateProduct } = useSalesPointState();

  const handleAddProduct = () => {
    const productToAdd = [...filteredProducts][productSelected];
    const productCheckout = { ...productToAdd, amount: items };
    updateProduct(productCheckout);
  };

  const handleGetProducts = async () => {
    const productsReponse = await getDataProducts();
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

  const getDataProducts = async () => {
    const qwerySnapshot = await getDocs(collection(db, "products"));

    const response: ProductType[] = [];
    qwerySnapshot.forEach((doc) => {
      const { category, subcategory, inventory, name, price } = doc.data();
      response.push({
        id: doc.id,
        name,
        price,
        category,
        inventory,
        subcategory,
      });
    });

    return response;
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  useEffect(() => {
    if (indexCategorySelected < 0 || !categories) return;

    setCategorySelected(categories[indexCategorySelected]);
    setSearchValue("");
    setProductSelected(-1);
  }, [indexCategorySelected]);

  useEffect(() => {
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
    <div className="grid p-4 gap-4">
      {/* Categorias */}
      <ContainerCard>
        <div className="flex gap-4 p-6">
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

      {/* Productos */}
      <ContainerCard>
        <div className="flex flex-col gap-2 text-black p-2">
          <AddItems
            items={items}
            setItems={setItems}
            disabled={productSelected < 0 || items <= 0}
            addProduct={handleAddProduct}
          />
          <div className="w-full">
            <SearchInput value={searchValue} setValue={setSearchValue} />
          </div>
          <div className="flex flex-col gap-1 py-2 max-h-60 overflow-y-scroll">
            {filteredProducts.length > 0 &&
              filteredProducts.map((product, index) => (
                <Product
                  key={`${categorySelected}_product_${index}`}
                  name={product.name}
                  index={index}
                  isSelected={index === productSelected}
                  setProductSelected={setProductSelected}
                />
              ))}
          </div>
        </div>
      </ContainerCard>
    </div>
  );
};
