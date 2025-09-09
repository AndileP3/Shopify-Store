import { gql, request } from "graphql-request";
import { useEffect, useState } from "react";
import Heading from "./components/Heading"; // ✅ import header

const URL = "https://vintage-store-team.myshopify.com/api/2025-07/graphql.json";
const STOREFRONT_TOKEN = "98f04c2261ef3843b0bcb76dd76a4cac";

const QUERY = gql`
  {
    products(first: 10) {
      edges {
        node {
          id
          title
          descriptionHtml
          featuredImage {
            url
            altText
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
    const typedResponse = response as {
      products: {
        edges: { node: any }[];
      };
    };
    return typedResponse.products.edges.map((edge: any) => edge.node);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const App = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getProducts();
      setProducts(data);
    })();
  }, []);

  return (
    <div>
      <Heading /> {/* ✅ Added header here */}
      <div style={{ padding: "20px" }}>
        {products.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                }}
              >
                {product.featuredImage && (
                  <img
                    src={product.featuredImage.url}
                    alt={product.featuredImage.altText || product.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />
                )}
                <h3>{product.title}</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
