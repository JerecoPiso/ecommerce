<template>
  <!-- The Modal -->
  <div class="modal" id="myModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add Product</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="AddProduct()" class="pt-1 pe-4 px-4 pb-1">
            <div class="mb-3">
              <label for="formFile" class="form-label">Photo</label>
              <input class="form-control" @change="changePhoto()" ref="photo" type="file" id="formFile">
            </div>
            <label for="">Product Name</label>
            <input type="text" name="" v-model="productInfo.pname" class="form-control" id="">
            <label for="">Description</label>
            <input type="text" name="" v-model="productInfo.description" class="form-control" id="">
            <label for="">Price</label>
            <input type="number" name="" v-model="productInfo.price" class="form-control" id="">
            <label for="">Stocks</label>
            <input type="number" name="" v-model="productInfo.stocks" class="form-control" id="">
            <label for="">Category</label>
            <select class="form-select" v-model="productInfo.category">
              <option v-for="c in category" :key="c.id" :value="c.id">{{ c.category }}</option>
            </select>
            <label for="">Brand</label>
            <select class="form-select" v-model="productInfo.brand">
              <option v-for="b in brands" :key="b.id" :value="b.id">{{ b.brand }}</option>
            </select>
            <div class="d-grid mt-2">
              <button type="submit" class="btn btn-primary btn-block">Add Product</button>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <!-- data-bs-dismiss="modal" -->
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  <p class="page-title">Dashboard | Products</p>
  <div class="table-products">
    <button type="button" data-bs-toggle="modal" data-bs-target="#myModal" class="add-btn"> <i
        class="fa-solid fa-plus"></i> Add Product</button>

    <input type="text" placeholder="Search . . ." name="" id="search-filter">
    <div class="tbl-max-height">
      <table class="table table-hover table-responsive table-bordered">
        <thead>
          <tr>
            <th>Image </th>
            <th>Product Name</th>
            <th>Stocks</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product, index in products" :key="product.id">
            <td><img :src="'/images/' + product.img_name" class="tbl-product-img"></td>
            <td>{{ product.product_name }}</td>
            <td>{{ product.stocks }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.brand }}</td>
            <td class="action-max-width">
              <button class="action-btn btn-add mt-2" @click="addStock(product.id, product.stocks)"><i
                  class="fa-solid fa-plus"></i> </button> &ThinSpace;
              <button class="action-btn btn-edit"><i class="fa-solid fa-pen-to-square"></i> </button> &ThinSpace;
              <button class="action-btn btn-archive" @click="archiveProduct(product.id, index, 1)"><i
                  class="fa-solid fa-trash"></i> </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <TablePagination :current-page="currentPage" :total-page="totalPage" @next="nextPage()" @prev="prevPage()">
    </TablePagination>
  </div>
  <!-- .table-products -->
  <div class="row">
    <div class="col-xl-4 col-lg-4">
      <div class="tables">
        <p class="table-title">Out of Stock Products</p>
        <div class="tbl-max-height">
          <div class="sold-out" v-for="product, index in outofstock" :key="product.id">
            <p class="mb-2 ff"><img :src="'/images/' + product.img_name" class="tbl-product-img"><span class="ms-4">{{
              product.product_name }}</span></p>
            <div class="btns">
              <button type="button" class="ff rm-item" @click="archiveProduct(product.id, index, 2)">Remove</button>
              <button type="button" class="ff add-stock" @click="addStock(product.id, product.stocks)">Add Stock</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-4 col-lg-4">
      <div class="tables">
        <p class="table-title">Product Category <button type="button" class="btn-add-category" @click="addCategory()"> <i
              class="fa-solid fa-plus"></i></button> </p>
        <div class="tbl-max-height ">
          <table class="table table-hover table-bordered">
            <tbody>
              <tr v-for="c, index in category" :key="c.id">
                <td>{{ c.category }}</td>
                <td class="action-td">
                  <button class="action-btn btn-edit" @click="updateCategory(c.id, c.category, index)"><i
                      class="fa-solid fa-pen-to-square"></i> </button> &ThinSpace;
                  <button class="action-btn btn-archive " @click="archiveCategory(c.id, index)"><i
                      class="fa-solid fa-trash"></i> </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="col-xl-4 col-lg-4">
      <div class="tables">
        <p class="table-title">Product Brand <button type="button" class="btn-add-brand" @click="addBrand()"> <i
              class="fa-solid fa-plus"></i> </button></p>
        <div class="tbl-max-height">
          <table class="table table-hover table-bordered">
            <tbody>
              <tr v-for="b, index in brands" :key="b.id">
                <td class="brand-category">{{ b.brand }}</td>
                <td class="action-td" style="width: 40%;">
                  <button class="action-btn btn-edit" @click="updateBrand(b.id, b.brand, index)"><i
                      class="fa-solid fa-pen-to-square"></i> </button> &ThinSpace;
                  <button class="action-btn btn-archive " @click="archiveBrand(b.id, index)"><i
                      class="fa-solid fa-trash"></i> </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import TablePagination from '@/components/TablePagination.vue';
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
  name: "OurProducts",
  components: {

    TablePagination
  },
  data() {
    return {
      productInfo: {
        pname: null,
        category: null,
        brand: null,
        photo: [],
        stocks: 0,
        price: 0,
        description: null
      },
      url: '',
      products: [],
      category: [],
      brands: [],
      outofstock: [],
      currentPage: 1,
      totalPage: 8,
    }
  },
  created() {
    this.getCategory()
    this.getProducts()
    this.getBrands()
    this.getoutofstock()
    this.url = axios.defaults.baseURL
  },
  methods: {
    async addStock(id, stocks) {
      const { value: stock } = await Swal.fire({
        title: 'Enter Stock',
        input: 'number',
        inputValue: stocks,
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Please write something!'
          }
        }
      })
      if (stock > 0) {
        let data = new FormData();
        data.append("stocks", stock);
        const response = await axios.put(`${this.url}admin/addStocks/${id}`, data);
        if (response.statusText == "OK") {
          Swal.fire('Stocks added successfully', '', 'success')
          this.getoutofstock()
          this.getProducts()
        }
      }

    },
    async addCategory() {
      const { value: newcategory } = await Swal.fire({
        title: 'Enter Category',
        input: 'text',
        inputValue: "",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Please write something!'
          }
        }
      })
      if (newcategory) {
        let data = new FormData()
        data.append("category", newcategory)
        await axios.post(this.url + "admin/createCategory", data).then(response => {
          Swal.fire({
            text: response.data.message,
            icon: response.data.responseType,
            confirmButtonText: 'OK'
          })
          this.getCategory()
        }).catch(err => {
          console.log(err)
        })
      }
    },
    async addBrand() {
      const { value: brand } = await Swal.fire({
        title: 'Enter Brand',
        input: 'text',
        inputValue: "",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Please write something!'
          }
        }
      })
      if (brand) {
        let data = new FormData()
        data.append("brand", brand)
        await axios.post(this.url + "admin/createBrand", data).then(response => {
          Swal.fire({
            text: response.data.message,
            icon: response.data.responseType,
            confirmButtonText: 'OK'
          })
          this.getBrands()
        }).catch(err => {
          console.log(err)
        })
      }
    },
    async AddProduct() {
      await axios.post(this.url + "admin/createProduct", this.productInfo, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(response => {
        Swal.fire({
          text: response.data.message,
          icon: response.data.responseType,
          confirmButtonText: 'OK'
        })
        this.productInfo.pname = null
        this.productInfo.brand = null
        this.productInfo.category = null
        this.productInfo.photo = []
        this.$refs.photo.value = null;
        this.productInfo.stocks = 0
        this.productInfo.price = 0
        this.productInfo.description = null
        this.getProducts()
        console.log(response.data)
      }).catch(err => {
        console.log(err)
      })
    },
    archiveProduct(id, index, toRemoveObject) {
      Swal.fire({
        title: 'Are you sure to archive this product?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Archive'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.put(`${this.url}admin/archiveProduct/${id}`).then(response => {
            if (response.statusText == "OK") {
              if (toRemoveObject == 1) {
                this.products.splice(index, 1);
              } else {
                this.outofstock.splice(index, 1);
              }
              Swal.fire('Removed!', 'Product has been archived.', 'success')
            }
          }
          ).catch(err => {
            console.log(err)
          })
        }
      })
    },

    archiveCategory(id, index) {
      console.log(id)
      Swal.fire({
        title: 'Are you sure to archive this category?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Archive'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.put(`${this.url}admin/archiveCategory/${id}`).then(response => {
            if (response.statusText == "OK") {
              this.category.splice(index, 1)
              Swal.fire('Removed!', 'Category has been archived.', 'success')
            }
          }
          ).catch(err => {
            console.log(err)
          })
        }
      })
    },
    archiveBrand(id, index) {
      // console.log(id)
      Swal.fire({
        title: 'Are you sure to archive this brand?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Archive'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.put(`${this.url}admin/archiveBrand/${id}`).then(response => {
            if (response.statusText == "OK") {
              this.brands.splice(index, 1)
              Swal.fire('Removed!', 'Brand has been archived.', 'success')
            }
          }
          ).catch(err => {
            console.log(err)
          })
        }
      })
    },
    async getoutofstock() {
      try {
        const response = await axios.get(this.url + "admin/getoutofstock");
        this.outofstock = []
        this.outofstock = response.data
      } catch (err) {
        console.log(err)
      }
    },
    async getProducts() {
      try {
        const response = await axios.get(this.url + "admin/showProducts");
        this.products = []
        this.products = response.data
      } catch (err) {
        console.log(err)
      }
    },
    async getCategory() {
      try {
        const response = await axios.get(this.url + "admin/showCategory");
        this.category = []
        this.category = response.data
      } catch (err) {
        console.log(err)
      }
    },
    async getBrands() {
      try {
        const response = await axios.get(this.url + "admin/showBrands");
        this.brands = []
        this.brands = response.data
      } catch (err) {
        console.log(err)
      }
    },
    async updateBrand(id, value, index) {
      const { value: newbrand } = await Swal.fire({
        title: 'Enter Brand',
        input: 'text',
        inputValue: value,
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Please write something!'
          }
        }
      })
      if (newbrand) {
        let data = new FormData()
        data.append("brand", newbrand)
        await axios.put(`${this.url}admin/updateBrand/${id}`, data).then(response => {
          Swal.fire({ text: response.data.message, icon: response.data.responseType, confirmButtonText: 'OK' })
          this.brands[index].brand = newbrand;
        }).catch(err => {
          console.log(err)
        })
      }
    },
    async updateCategory(id, value, index) {
      console.log(id + value)
      const { value: newcategory } = await Swal.fire({
        title: 'Enter Category',
        input: 'text',
        inputValue: value,
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Please write something!'
          }
        }
      })
      if (newcategory) {
        let data = new FormData()
        data.append("category", newcategory)
        await axios.put(`${this.url}admin/updateCategory/${id}`, data).then(response => {
          Swal.fire({ text: response.data.message, icon: response.data.responseType, confirmButtonText: 'OK' })
          this.category[index].category = newcategory;
        }).catch(err => {
          console.log(err)
        })
      }
    },
    changePhoto() {
      this.productInfo.photo = this.$refs.photo.files[0]
    },
    nextPage() {
      if (this.currentPage < this.totalPage) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    }
  }
}
</script>
<style scoped src="@/assets/css/admin/index.css"></style>