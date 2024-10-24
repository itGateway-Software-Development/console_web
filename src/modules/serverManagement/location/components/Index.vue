<script lang="ts" setup>
import { TableHeaderType } from "@/app/components/tables/types";
import { onMounted, type PropType, onBeforeUnmount, ref, watch } from "vue";
import { Search } from "lucide-vue-next";
import List from "list.js";
import Swal from "sweetalert2";
import FormDialog from "./FormDialog.vue";
import { locationService, authService } from "@/app/service/httpService/httpServiceProvider";
import { askConfirmation, toastError, toastSuccess } from "@/plugins/sweetAlert";
import Loading from "@/modules/shared/Loading.vue";
import { LocationPayload } from "../types/LocationType";

const formData = ref<any>(null);
const isEdit = ref<boolean>(false);

const emit = defineEmits(["onSelectAll", "onSubmitted"]);

const props = defineProps({
  id: {
    type: String,
    default: null
  },
  headerItems: {
    type: Array as PropType<TableHeaderType[]>,
    default: () => []
  },
  items: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  tdClass: {
    type: String,
    default: ""
  },
  thClass: {
    type: String,
    default: ""
  },
  theadClass: {
    type: String,
    default: ""
  },
  trClass: {
    type: String,
    default: ""
  },
  tableClass: {
    type: String,
    default: ""
  },
  headTrClass: {
    type: String,
    default: ""
  },
  tbodyClass: {
    type: String,
    default: ""
  }
});
const listJsTable = ref();
const createEditModal = ref(false);
const tableData = ref(props.items);
const authUser = authService.getUser();
const pageLoad = ref(false);

onMounted(() => {
  if (props.id) {
    const values = props.headerItems.map((item) => item.value);
    const options: any = {
      valueNames: values,
      pagination: true,
      page: 5
    };

    listJsTable.value = new List(props.id, options).on(
      "updated",
      (list: any) => {
        const noResultEle: any = document.querySelector(".no-result");

        if (noResultEle) {
          if (list.matchingItems.length === 0) {
            noResultEle.style.display = "block";
          } else {
            noResultEle.style.display = "none";
          }
        }
        // refreshCallbacks();
      }
    );
    if(props.items.length > 0) {
      listJsTable.value.sort("id", { order: "desc" });
    }
    addEventListeners();
  }
});

onBeforeUnmount(() => {
  const nextEle = document.querySelector(".pagination-next");
  nextEle?.removeEventListener("click", () => {});
  const prevEle = document.querySelector(".pagination-prev");
  prevEle?.removeEventListener("click", () => {});
  const checkAllEle: any = document.getElementById("checkAll");
  checkAllEle?.removeEventListener("click", () => {});
  const deleteBtns = document
    .querySelector("#" + props.id)
    ?.querySelectorAll("tbody .action .delete-btn");
  if (deleteBtns) {
    Array.from(deleteBtns).forEach((btn) => {
      btn.removeEventListener("click", () => {});
    });
  }
});

const addEventListeners = () => {
  const nextEle = document.querySelector(".pagination-next");
  const listPaginationEle: any = document.querySelector(
    ".pagination.listjs-pagination"
  );

  if (nextEle) {
    nextEle.addEventListener("click", () => {
      if (listPaginationEle) {
        if (
          listPaginationEle.querySelector(".active")?.nextElementSibling !==
          null
        ) {
          nextEle.classList.remove("disabled");

          listPaginationEle
            .querySelector(".active")
            ?.nextElementSibling?.children[0].click();
        } else {
          nextEle.classList.add("disabled");
        }
      }
    });
  }

  const prevEle = document.querySelector(".pagination-prev");
  if (prevEle) {
    prevEle.addEventListener("click", () => {
      if (listPaginationEle) {
        if (
          listPaginationEle.querySelector(".active").previousSibling !== null
        ) {
          prevEle.classList.remove("disabled");
          listPaginationEle
            .querySelector(".active")
            ?.previousSibling?.children[0].click();
        } else {
          prevEle.classList.add("disabled");
        }
      }
    });
  }

  const checkAllEle: any = document.getElementById("checkAll");
  if (checkAllEle) {
    checkAllEle.addEventListener("click", () => {
      const checkboxes = document.querySelectorAll(
        '.form-check-all input[type="checkbox"]'
      );
      Array.from(checkboxes).forEach((checkbox: any) => {
        checkbox.checked = checkAllEle.checked;
        if (checkbox.checked) {
          checkbox.closest("tr").classList.add("table-active");
        } else {
          checkbox.closest("tr").classList.remove("table-active");
        }
      });
    });
  }

  refreshCallbacks();
};

const refreshCallbacks = () => {
  const deleteBtns = document
    .querySelector("#" + props.id)
    ?.querySelectorAll("tbody .action .delete-btn");

  if (deleteBtns) {
    Array.from(deleteBtns).forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.parentElement?.closest("tr")?.children[0].innerHTML;
        // listJsTable.value.remove("id", id);
        deleteRecord(id);
        // console.log(id);
      });
    });
  }

  const editButtons = document.querySelectorAll(".edit-item-btn");

  Array.from(editButtons).forEach((element) => {
    element.addEventListener("click", () => {
      const id = element.parentElement?.closest("tr")?.children[0].innerHTML;
      const data = tableData.value.find((item) => item.id == id);
      formData.value = { ...data };
      isEdit.value = true;
      createEditModal.value = true;
    });
  });
};

const onDeleteMultipleRecords = () => {
  let checkedIds: string[] = [];
  const checkedElements = document.getElementsByName("chk_child");
  Array.from(checkedElements).forEach((element: any) => {
    if (element.checked) {
      const elementId = element.closest("tr").children[0].innerHTML;
      checkedIds.push(elementId);
    }
  });

  if (checkedIds.length) {
    askConfirmation().then(async(result) => {
      if(result.isConfirmed) {
        pageLoad.value = true
        try {
          const res = await locationService.deleteMulti(authUser.token, {ids: checkedIds});
          if(res.data.status == 'success') {
            pageLoad.value = false
            toastSuccess(res.data.message)
            emit('onSubmitted', true)
          } else {
            pageLoad.value = false
            toastError(res.data.message)
          }
        } catch (error) {
          pageLoad.value = false
          console.error("Error uploading file:", error);
          toastError("Something Wrong !")
        }
      }
    })

  } else {
    Swal.fire({
      title: "Please select at least one checkbox",
      customClass: {
        confirmButton:
          "text-white btn bg-default-500 border-default-500 hover:text-white hover:bg-default-500 hover:border-default-600 focus:text-white focus:bg-default-500 focus:border-default-600 focus:ring focus:ring-default-100 active:text-white active:bg-default-500 active:border-default-600 active:ring active:ring-default-100 dark:ring-default-400/20"
      },
      buttonsStyling: false,
      showCloseButton: true
    });
  }
};

const onAddNew = () => {
  formData.value = {
    name: "",
    image: "",
    status: 1,
  };
  createEditModal.value = true;
};

const deleteRecord = (id: any) => {
  askConfirmation().then(async(result) => {
    if(result.isConfirmed) {
      pageLoad.value = true
      try {
        const res = await locationService.delete(authUser.token,id);
        if(res.data.status == 'success') {
          toastSuccess(res.data.message)
          emit("onSubmitted", id);
          pageLoad.value = false
        }
      } catch (error) {
        pageLoad.value = false
        console.error("Error uploading file:", error);
        toastError("Something Wrong !");
      }
    }
  })
};

// refetch all data from server when finished adding
const onSubmittedForm = async(data:any) => {
   try {
    pageLoad.value = true
    const payload: LocationPayload = {
        name: data.name,
        image: data.image,
        status: data.status
      }
      const res = isEdit.value ? await locationService.update(authUser.token, data.id, payload) : await locationService.store(authUser.token, payload);
      if(res.data.status == 'success') {
        isEdit.value = false
        createEditModal.value = false
        toastSuccess(res.data.message)
        emit('onSubmitted', true)
      }
    } catch (error) {
      pageLoad.value = false
      console.error("Error uploading file:", error);
      toastError("Something Wrong !")
    }
}

</script>
<template>
  <Loading v-if="pageLoad" />
  <div :id="items.length > 0 ? id : ''">
    <div class="grid grid-cols-1 gap-5 mb-5 xl:grid-cols-2">
      <div>
        <div class="relative xl:w-3/6">
          <input
            type="text"
            class="ltr:pl-8 rtl:pr-8 search form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
            placeholder="Search for ..."
            autocomplete="off"
          />
          <Search
            class="inline-block size-4 absolute ltr:left-2.5 rtl:right-2.5 top-2.5 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-600"
          />
        </div>
      </div>
      <div class="flex gap-2 ltr:md:justify-end rtl:md:justify-start">
        <TButton @click="onAddNew">
          <i class="align-bottom ri-add-line me-1" /> Add Location
        </TButton>
        <TButton color="red" icon @click="onDeleteMultipleRecords">
          <i class="ri-delete-bin-2-line" />
        </TButton>
      </div>
    </div>
    <table class="w-full" :class="tableClass">
      <thead class="ltr:text-left rtl:text-right" :class="theadClass">
        <tr :class="headTrClass">
          <th
            class="px-3.5 py-2.5 font-semibold"
            v-for="(item, index) in headerItems"
            :key="'table-header-' + index"
            :class="thClass"
            :style="`${item.value === 'id' ? 'display: none' : ''} `"
          >
            <span v-if="item.type && item.type == 'check'">
              <input
                class="size-4 border rounded-sm appearance-none cursor-pointer bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-custom-500 checked:border-custom-500 dark:checked:bg-custom-500 dark:checked:border-custom-500 checked:disabled:bg-custom-400 checked:disabled:border-custom-400"
                type="checkbox"
                value="option"
                id="checkAll"
                @click="emit('onSelectAll')"
              />
            </span>

            {{ item.title }}
          </th>
        </tr>
      </thead>
      <tbody class="list" :class="tbodyClass" v-if="tableData.length > 0">
        <tr
          v-for="(item, index) in tableData"
          :key="'table-row-' + index"
          :class="`${trClass} ${item.isActive ? 'active' : ''}`"
        >
          <td
            v-for="(header, index) in headerItems"
            :key="'basic-table-tr-' + index"
            class="px-3.5 py-2.5"
            :class="`${tdClass} ${header.value}`"
            :style="`${header.value === 'id' ? 'display: none' : ''} `"
          >
            <slot :name="header.value" :value="item">
              {{ item[header.value] }} 
            </slot>
          </td>
        </tr>
      </tbody>
      
    </table>
    <div class="no-result" v-if="tableData.length == 0">
      <div class="text-center p-7 flex flex-col justify-center items-center gap-5">
        <img class="w-60" src="@/assets/images/start.png" alt="">
        <h5 class="mb-2">You have no data. <span class="text-custom-500 font-bold">Add Now !</span></h5>
        <div class="w-[200px]">
          <Button text="Add Now"  @click="onAddNew" />
        </div>
      </div>
    </div>
    <div class="no-result" style="display: none">
      <div class="text-center p-7">
        <h5 class="mb-2">Sorry! No Result Found</h5>
        <p class="mb-0 text-slate-500 dark:text-zink-200">
          We've searched more than 150+ data We did not find any data for
          you search.
        </p>
      </div>
    </div>
    <div class="flex justify-end mt-4">
      <div class="flex gap-2 pagination-wrap">
        <a
          class="inline-flex items-center justify-center bg-white dark:bg-zink-700 h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-50 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 [&amp;.active]:text-custom-500 dark:[&amp;.active]:text-custom-500 [&amp;.active]:bg-custom-50 dark:[&amp;.active]:bg-custom-500/10 [&amp;.active]:border-custom-50 dark:[&amp;.active]:border-custom-500/10 [&amp;.active]:hover:text-custom-700 dark:[&amp;.active]:hover:text-custom-700 [&amp;.disabled]:text-slate-400 dark:[&amp;.disabled]:text-zink-300 [&amp;.disabled]:cursor-auto page-item pagination-prev disabled"
          href="#"
        >
          Previous
        </a>
        <ul class="flex gap-2 mb-0 pagination listjs-pagination"></ul>
        <a
          class="inline-flex items-center justify-center bg-white dark:bg-zink-700 h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-50 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 [&amp;.active]:text-custom-500 dark:[&amp;.active]:text-custom-500 [&amp;.active]:bg-custom-50 dark:[&amp;.active]:bg-custom-500/10 [&amp;.active]:border-custom-50 dark:[&amp;.active]:border-custom-500/10 [&amp;.active]:hover:text-custom-700 dark:[&amp;.active]:hover:text-custom-700 [&amp;.disabled]:text-slate-400 dark:[&amp;.disabled]:text-zink-300 [&amp;.disabled]:cursor-auto page-item pagination-prev pagination-next"
          href="#"
        >
          Next
        </a>
      </div>
    </div>
  </div>
 

  <FormDialog
    v-if="createEditModal"
    v-model="createEditModal"
    :formData="formData"
    :isEdit="isEdit"
    @onSubmitted="onSubmittedForm"
  />
</template>
