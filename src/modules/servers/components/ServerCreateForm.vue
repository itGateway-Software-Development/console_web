<script lang="ts" setup>
    import Netherland from '@/assets/images/servers/netherland.png'
    import Myanmar from '@/assets/images/servers/myanmar.png'
    import Thailand from '@/assets/images/servers/thailand.png'
    import Singapore from '@/assets/images/servers/singapore.png'
    import Ubuntu from '@/assets/images/servers/ubuntu.png'
    import Window from '@/assets/images/servers/window.png'
    import Centos from '@/assets/images/servers/centos.png'
    import Debian from '@/assets/images/servers/debian.png'
    import { ref } from 'vue';

    const locations = ref( [
        {
            name: 'Netherland',
            image: Netherland,
            isChecked: true
        },
        {
            name: 'Myanmar',
            image: Myanmar,
            isChecked: false
        },
        {
            name: 'Thailand',
            image: Thailand,
            isChecked: false
        },
        {
            name: 'Singapore',
            image: Singapore,
            isChecked: false
        }
    ])

    const operationSystems = ref([
        {
            name: 'Ubuntu',
            image: Ubuntu,
            version: ['18.04', '20.04', '22.04'],
            selectedVersion: '22.04',
            isChooseOsVersion: false,
            isChecked: true
        },
        {
            name: 'Windows',
            image: Window,
            version: ['10', '11'],
            selectedVersion: null,
            isChooseOsVersion: false,
            isChecked: false
        },
        {
            name: 'Centos',
            image: Centos,
            version: ['7', '8'],
            selectedVersion: null,
            isChooseOsVersion: false,
            isChecked: false
        },
        {
            name: 'Debian',
            image: Debian,
            version: ['10', '11'],
            selectedVersion: null,
            isChooseOsVersion: false,
            isChecked: false
        }
    ])

    const serverSpecifications = ref([
        {
            name: 'evm.cl.mini​', 
            os: 'Ubuntu',
            specs: [
                "2 vCPU, 4 GB RAM",
                "50 GB NVMe SSD",
                "1 Gbps Virtual Network Virtual Firewall",
                "1 Elastic IP, 1 Snapshot",
                "100 GB Cloud Backup, Cloud Monitoring",
            ],
            price: "$ 0.021 /hour",
            isSelect: true
        },
        {
            name: 'evm.cl.small​', 
            os: 'Ubuntu',
            specs: [
                "2 vCPU, 4 GB RAM​",
                "100 GB NVMe SSD",
                "1 Gbps Virtual Network Virtual Firewall",
                "1 Elastic IP, 1 Snapshot",
                "100 GB Cloud Backup, Cloud Monitoring",
            ],
            price: "$ 0.042 /hour",
            isSelect: false
        },
        {
            name: 'evm.cl.medium​', 
            os: 'Ubuntu',
            specs: [
                "4 vCPU, 8 GB RAM​",
                "200 GB NVMe SSD",
                "1 Gbps Virtual Network Virtual Firewall",
                "1 Elastic IP, 1 Snapshot",
                "100 GB Cloud Backup, Cloud Monitoring",
            ],
            price: "$ 0.082 /hour",
            isSelect: false
        },
        {
            name: 'evm.cl.large', 
            os: 'Ubuntu',
            specs: [
                "4 vCPU, 16 GB RAM​",
                "200 GB NVMe SSD",
                "5 Gbps Virtual Network Virtual Firewall",
                "2 Elastic IP, 1 Snapshot",
                "200 GB Cloud Backup, Cloud Monitoring",
            ],
            price: "$ 0.105 /hour",
            isSelect: false
        },
        {
            name: 'evm.cl.xlarge', 
            os: 'Ubuntu',
            specs: [
                "8 vCPU, 32 GB RAM​",
                "300 GB NVMe SSD",
                "5 Gbps Virtual Network Virtual Firewall",
                "2 Elastic IP, 1 Snapshot",
                "300 GB Cloud Backup, Cloud Monitoring",
            ],
            price: "$ 0.209 /hour",
            isSelect: false
        },
    ])

    const selectedServerDetail = ref <any>({
        location: {
            name: 'Netherland',
            image: Netherland
        },
        specifications: {
            name: 'evm.cl.mini​', 
            os: 'Ubuntu',
            specs: [
                "2 vCPU, 4 GB RAM",
                "50 GB NVMe SSD",
                "1 Gbps Virtual Network Virtual Firewall",
                "1 Elastic IP, 1 Snapshot",
                "100 GB Cloud Backup, Cloud Monitoring",
            ],
            price: "$ 0.021 /hour",
        },
        operationSystems: {
            name: 'Ubuntu',
            image: Ubuntu,
            version: ['18.04', '20.04', '22.04'],
            selectedVersion: '22.04',
            isChooseOsVersion: false,
            isChecked: true
        }
    })

    const handleSelectServer = (name: string) => {
        serverSpecifications.value.forEach((server) => {
            if (server.name === name) {
                server.isSelect = true

                selectedServerDetail.value.specifications = server
            } else {
                server.isSelect = false
            }
        })
    }

    const handleSelectLocation = (name: string) => {
        locations.value.forEach((location) => {
            if (location.name === name) {
                location.isChecked = true

                selectedServerDetail.value.location = {
                    name: name,
                    image: location.image
                }
            } else {
                location.isChecked = false
            }
        })
    }

    const selectedVersion = (version: string, name: string) => {
        operationSystems.value.forEach((os) => {
            if (os.name === name) {
                os.isChecked = true
                os.isChooseOsVersion = false
                os.selectedVersion = version
                selectedServerDetail.value.operationSystems = os
            } else {
                os.isChecked = false
                os.isChooseOsVersion = false
                os.selectedVersion = null
            }
        })
    }

    const handleSelectOs = (name: string) => {
        operationSystems.value.forEach((os) => {
            if (os.name === name) {
                os.isChooseOsVersion = true
            } else {
                os.isChooseOsVersion = false
            }
        })
    }

</script>
<template>
    <section class="mt-5">
        <div class="grid grid-cols-1 sm:grid-cols-7 gap-3 relative">
            <div class="col-span-1 md:col-span-5">
                <div class="card p-0 m-0 mb-8">
                    <div class="px-5 py-3 flex justify-start items-center gap-3 bg-slate-400 dark:bg-gray-700">
                        <span class="bg-slate-300 w-5 h-5 text-black text-center rounded-full">1</span>
                        <h5>Location</h5>
                    </div>
                    <div class="p-5 flex flex-col gap-3">
                        <span>Select a data center location for your itGateway Cloud server.</span>
                        <div class="grid grid-cols-5 gap-3">
                            <div :class="`col-span-1 border rounded cursor-pointer ${location.isChecked ? 'border-green-500 dark:border-green-500' : 'border-zink-500 dark:border-zink-500'}`" v-for="location in locations" :key="location.name" @click="handleSelectLocation(location.name)">
                                <div class="flex items-center gap-3 p-3 py-5">
                                    <img :src="location.image" class="w-[30px]" alt="">
                                    <span>{{ location.name }}</span>
                                </div>
                                <div class="bg-slate-200 dark:bg-zink-500 flex justify-center py-1 rounded">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" :class="`size-6 ${location.isChecked ? 'text-green-500' : 'text-red-500'}`">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                      </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card p-0 m-0 mb-8">
                    <div class="px-5 py-3 flex justify-start items-center gap-3 bg-slate-400 dark:bg-gray-700">
                        <span class="bg-slate-300 w-5 h-5 text-black text-center rounded-full">2</span>
                        <h5>Operating System</h5>
                    </div>
                    <div class="p-5 flex flex-col gap-3">
                        <span>Select an operating system for your server instance.</span>
                        <div class="grid grid-cols-5 gap-3">
                            <div :class="`col-span-1 border rounded cursor-pointer ${os.isChecked ? 'border-green-500 dark:border-green-500' : 'border-zink-500 dark:border-zink-500'}`" v-for="os in operationSystems" :key="os.name">
                                <div class="flex items-center gap-3 p-3 py-5" @click="handleSelectOs(os.name)">
                                    <img :src="os.image" class="w-[30px]" alt="">
                                    <span>{{os.name}}</span>
                                </div>
                                <div class="flex flex-col" v-if="os.isChooseOsVersion">
                                    <span @click="selectedVersion(data, os.name)" class="text-center hover:bg-slate-200 dark:hover:bg-zink-500" v-for="data in os.version" :key="data">{{data}}</span>
                                </div>
                                <div v-else>
                                    <div class="bg-slate-200 dark:bg-zink-500 flex justify-between items-center py-1 rounded px-3" v-if="os.selectedVersion">
                                        <span class="text-center flex-1">{{os.selectedVersion}}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                          </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card p-0 m-0 mb-8">
                    <div class="px-5 py-3 flex justify-start items-center gap-3 bg-slate-400 dark:bg-gray-700">
                        <span class="bg-slate-300 w-5 h-5 text-black text-center rounded-full">3</span>
                        <h5>Servers</h5>
                    </div>
                    <div class="p-5 flex flex-col gap-3">
                        <span>Select a itGateway Cloud server configuration.</span>
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                            <div :class="`col-span-1 border rounded ${spec.isSelect ? 'border-green-500 dark:border-green-500' : 'border-zink-500 dark:border-zink-500'} px-3 py-5`" v-for="spec in serverSpecifications" :key="spec.name">
                                <div class="flex flex-col gap-3 h-full">
                                    <h5>{{spec.name}}​​</h5>
                                    <div>
                                        <span class="bg-default-500 inline px-3 py-1 rounded">{{spec.os}}</span>
                                    </div>
                                    <div class="flex flex-col gap-1 flex-grow">
                                        <span class="text-sm" v-for="data in spec.specs" :key="data">{{data}}​</span>
                                    </div>
                                    <div class="flex flex-col gap-1">
                                        <span class="text-default-500">From</span>
                                        <span class="text-default-500 font-bold">{{spec.price}}</span>
                                    </div>
                                    <div class="mt-auto">
                                        <Button :text="spec.isSelect ? 'Selected' : 'Choose a reservation'" class="text-xs font-medium py-1" @click="handleSelectServer(spec.name)" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
            <div class="col-span-1 md:col-span-2">
                <div class="sticky top-[90px]">
                    <div class="card">
                        <h5 class="px-5 py-3 mb-3 text-center border-b">Summary</h5>
                        <div class="px-5 py-3 grid grid-cols-3 items-center gap-2">
                            <div class="col-span-1">
                                <h6>Location</h6>
                            </div>
                            <div class="col-span-2">
                                <div class="flex items-center gap-2">
                                    <img :src="selectedServerDetail.location.image" class="w-[30px]" alt="">
                                    <span>{{selectedServerDetail.location.name}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="px-5 py-3 grid grid-cols-3 items-center gap-2">
                            <div class="col-span-1">
                                <h6>OS</h6>
                            </div>
                            <div class="col-span-2">
                                <div class="flex items-center gap-2">
                                    <img :src="selectedServerDetail.operationSystems.image" class="w-[30px]" alt="">
                                    <span>{{selectedServerDetail.operationSystems.name}} {{selectedServerDetail.operationSystems.selectedVersion}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="px-5 py-3 grid grid-cols-3 items-start gap-2">
                            <div class="col-span-1">
                                <h6>Speces</h6>
                            </div>
                            <div class="col-span-2">
                                <div class="flex flex-col gap-1">
                                    <span v-for="spec in selectedServerDetail.specifications.specs" :key="spec">{{spec}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="px-5 py-3 grid grid-cols-3 items-center gap-2">
                            <div class="col-span-1">
                                <h6>Price</h6>
                            </div>
                            <div class="col-span-2">
                                <h5>{{selectedServerDetail.specifications.price}}</h5>
                            </div>
                        </div>
                        <div class="w-1/2 mx-auto mt-5 pb-7">
                            <Button text="Deploy" />
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </section>
</template>
