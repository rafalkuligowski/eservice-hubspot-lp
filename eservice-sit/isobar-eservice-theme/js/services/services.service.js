const ServicesService = {
    apiUrl: 'https://api.hubapi.com/hubdb/api/v2/tables',
    portalId: PORTAL_ID,
    getCategories(db, parentCategory = null) {
        let params = '';
        if(parentCategory) {
            params = `&parent_category__contains=${parentCategory}`;
        }
        const url = `${this.apiUrl}/${db}/rows?portalId=${this.portalId}${params}`;
        return fetch(url)
            .then(response => response.json())
            .then(data => data['objects'])
            .then(data => {
                data = data.map(category => {
                    return this.mapCategory(category);
                });
                return data;
            });
    },
    mapCategory(category) {
        const values = category.values;
        return {
            id: category.id,
            name: values[1],
            description: values[3],
            icon: values[12],
            parentCategory: values[6],
            favoriteServices: values[13] || [],
            path: category.path,
            order: values[14],
        }
    },
    mapService(service) {
        const values = service.values;
        return {
            id: service.id,
            name: values[1],
            shortDescription: values[10],
            description: values[11],
            icon: values[9],
            image: values[3],
            category: values[8],
            customPagePath: values[12] || '',
        }
    },
    getServicesByIds(db,ids) {
        let params = '';
        if(ids) {
            params = `&hs_id__in=${ids}`;
        }
        const url = `${this.apiUrl}/${db}/rows?portalId=${this.portalId}${params}`;
        return fetch(url)
            .then(response => response.json())
            .then(data => data['objects'])
            .then(data => {
                data = data.map(service => {
                    return this.mapService(service);
                });
                return data;
            });
    },
    getPopularServices(db) {
        let params = '&most_popular__eq=1';
        const url = `${this.apiUrl}/${db}/rows?portalId=${this.portalId}${params}`;
        return fetch(url)
            .then(response => response.json())
            .then(data => data['objects'])
            .then(data => {
                data = data.map(service => {
                    return this.mapService(service);
                });
                return data;
            });
    },
    getServices(db, category = null) {
        let params = '';
        if(category) {
            params = `&category__contains=${category}`;
        }
        const url = `${this.apiUrl}/${db}/rows?portalId=${this.portalId}${params}`;
        return fetch(url)
            .then(response => response.json())
            .then(data => data['objects'])
            .then(data => {
                data = data.map(service => {
                    return this.mapService(service);
                });
                return data;
            });
    },
    setExtraUrlParam(param, value) {
        const buttons = $('.hero__wrapper .hero__buttons-wrapper .hero__button-blue, .ask-for-offer__wrapper .ask-for-offer__cta a');
        buttons.each((index, button) => {
            const url =  new URL(button.href);
            url.searchParams.append(param, value);
            $(button).attr('href', url.href);
        })
    },
};
