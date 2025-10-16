
export class Client {

    async fetchCategories() {
        try {
            const response = await fetch(`${process.env.baseURL}/items/categories`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // If authentication is required, include the token
                    // 'Authorization': `Bearer ${process.env.MAGENTO_ACCESS_TOKEN}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                const errorText = await response.text();
                throw new Error(`Error: ${response.status} - ${errorText}`);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            return "Error";
        }
    };


    async fetchHeroSliderSection() {
        try {
            const response: any = await fetch(`${process.env.baseURL}/items/hero_slider_slides`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // If authentication is required, include the token
                    // 'Authorization': `Bearer ${process.env.MAGENTO_ACCESS_TOKEN}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                const errorText = await response.text();
                throw new Error(`Error: ${response.status} - ${errorText}`);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            return "Error";
        }
    };

    async fetchHomePageProducts() {
        try {
            const response: any = await fetch(`${process.env.baseURL}/items/products`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // If authentication is required, include the token
                    // 'Authorization': `Bearer ${process.env.MAGENTO_ACCESS_TOKEN}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                const errorText = await response.text();
                throw new Error(`Error: ${response.status} - ${errorText}`);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            return "Error";
        }
    };

        async fetchHomeSection2 () {
        try {
            const response: any = await fetch(`${process.env.baseURL}/items/cms_block?filter[url_key][_eq]=home-section-2`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // If authentication is required, include the token
                    // 'Authorization': `Bearer ${process.env.MAGENTO_ACCESS_TOKEN}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                const errorText = await response.text();
                throw new Error(`Error: ${response.status} - ${errorText}`);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            return "Error";
        }
    };

    async fetchProductBySlug(slug: string) {
        try {
            const res = await fetch(`${process.env.baseURL}/items/products?filter[slug][_eq]=${slug}&fields=*,related_products.*,images.*,cross_sell_products.*,up_sell_products.*,product_review.*,variants.*`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error(`Failed to fetch product: ${res.status}`);

            const data = await res.json();
            return data.data?.[0] || null;
        } catch (err) {
            console.error("Error fetching product by slug:", err);
            return null;
        }
    }

    async fetchRelatedProductsByIDs(ids: string[]) {
    try {
        const idsParam = ids.join(','); // convert array -> comma-separated string
        const res = await fetch(
            `${process.env.baseURL}/items/products?filter[id][_in]=${idsParam}&fields=*,related_products.*,images.*,cross_sell_products.*,up_sell_products.*,product_review.*,variants.*`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );

        if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);

        const data = await res.json();
        return data.data || []; // return array of products
    } catch (err) {
        console.error("Error fetching products by IDs:", err);
        return [];
    }
}

}