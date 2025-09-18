import { gql, request } from "graphql-request";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/SuperDeals.module.css";
import { useSearch } from "./SearchContext";

const URL = "https://vintage-store-team.myshopify.com/api/2025-07/graphql.json";
const STOREFRONT_TOKEN = "98f04c2261ef3843b0bcb76dd76a4cac";

const QUERY = gql`
{
  products(first: 100) {
    edges {
      node {
        id
        title
        featuredImage {
          url
          altText
        }
        productType
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
}
`;

const getProducts = async () => {
  try {
    const response = await request(
      URL,
      QUERY,
      {},
      {
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
        "Content-Type": "application/json",
      }
    );
    const typedResponse = response as { products: { edges: { node: any }[] } };
    return typedResponse.products.edges.map((edge) => edge.node);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const MultiProduct = () => {
  const [products, setProducts] = useState<any[]>([]);
  const { search } = useSearch();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const data = await getProducts();
      setProducts(data);
    })();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  // Super Deals: cheapest
  const superDeals = [...filteredProducts].sort(
    (a, b) =>
      parseFloat(a.priceRange.minVariantPrice.amount) -
      parseFloat(b.priceRange.minVariantPrice.amount)
  );

  // Selected for You: 50 random
  const shuffled = [...filteredProducts].sort(() => 0.5 - Math.random());
  const selectedForYou = shuffled.slice(0, 50);

  const formatPrice = (product: any) => {
    const minPrice = product.priceRange.minVariantPrice;
    const maxPrice = product.priceRange.maxVariantPrice;
    return minPrice.amount === maxPrice.amount
      ? `${minPrice.amount} ${minPrice.currencyCode}`
      : `${minPrice.amount} - ${maxPrice.amount} ${minPrice.currencyCode}`;
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300; // adjust how far it scrolls
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.container}>
      {filteredProducts.length === 0 ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <>
          {/* Super Deals with Arrows */}
          <div className={styles.superDealsHeader}>
            <h2 className={styles.sectionTitle}>🔥 Super Deals</h2>
            <div className={styles.arrows}>
              <button onClick={() => scroll("left")} className={styles.arrowBtn}>
                ◀
              </button>
              <button onClick={() => scroll("right")} className={styles.arrowBtn}>
                ▶
              </button>
            </div>
          </div>
          <div className={styles.horizontalScroll} ref={scrollRef}>
            {superDeals.slice(0, 15).map((product) => (
              <Link
                key={product.id}
                to={`/product/${encodeURIComponent(product.id)}`}
                className={styles.cardLink}
              >
                <div className={styles.cardHorizontal}>
                  {product.featuredImage && (
                    <img
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText || product.title}
                      className={styles.imageSmall}
                    />
                  )}
                  <h3 className={styles.cardTitle}>{product.title}</h3>
                  <p className={styles.price}>{formatPrice(product)}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Selected for You */}
          <h2 className={styles.sectionTitle}>✨ Selected for You</h2>
          <div className={styles.grid}>
            {selectedForYou.map((product) => (
              <Link
                key={product.id}
                to={`/product/${encodeURIComponent(product.id)}`}
                className={styles.cardLink}
              >
                <div className={styles.card}>
                  {product.featuredImage && (
                    <img
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText || product.title}
                      className={styles.image}
                    />
                  )}
                  <h3 className={styles.cardTitle}>{product.title}</h3>
                  <p className={styles.price}>{formatPrice(product)}</p>
                  {product.productType && (
                    <p className={styles.category}>{product.productType}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MultiProduct;
