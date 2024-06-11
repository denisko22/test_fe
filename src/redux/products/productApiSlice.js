import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";

export const productAdapter = createEntityAdapter({});

const initialState = productAdapter.getInitialState();

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            query: () => ({
                url: '/products',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: responseData => {
                const loadedProducts = responseData.map(product => {
                    product.id = product._id;
                    return product;
                });
                return productAdapter.setAll(initialState, loadedProducts);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Product', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Product', id })),
                    ];
                } else return [{ type: 'Product', id: 'LIST' }];
            },
        }),
        addNewProduct: builder.mutation({
            query: initialProductData => ({
                url: "/products",
                method: "POST",
                body: {
                    ...initialProductData,
                },
            }),
            invalidatesTags: [{ type: "Product", id: 'LIST' }],
        }),
        updateProduct: builder.mutation({
            query: initialProductData => ({
                url: `/products/${initialProductData.id}`,
                method: "PUT",
                body: {
                    ...initialProductData,
                },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: arg.id },
            ],
        }),
        deleteProduct: builder.mutation({
            query: ({ id }) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: arg.id },
            ],
        }),
        addComment: builder.mutation({
            query: initialCommentData => ({
                url: "/comments",
                method: "POST",
                body: {
                    ...initialCommentData,
                },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: arg.productId },
            ],
        }),
        deleteComment: builder.mutation({
            query: ({ id }) => ({
                url: `/comments/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: arg.productId },
            ],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useAddNewProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useAddCommentMutation,
    useDeleteCommentMutation,
} = productApiSlice;

export const selectProductsResult = productApiSlice.endpoints.getProducts.select();

const selectProductsData = createSelector(
    selectProductsResult,
    productsResult => productsResult.data
);

export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectIds: selectProductIds,
} = productAdapter.getSelectors(state => selectProductsData(state) ?? initialState);
