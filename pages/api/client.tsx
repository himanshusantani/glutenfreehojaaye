
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
            const response:any = await fetch(`${process.env.baseURL}/items/hero_slider_slides`, {
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
            const response:any = await fetch(`${process.env.baseURL}/items/products`, {
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
}