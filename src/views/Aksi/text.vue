<div>
    <b-modal
      v-model="modalShow"
      hide-footer
      @hidden="resetField()"
      :title="titleModalManual"
      scrollable
    >
      <form @submit.prevent="submitForm">
        <div class="clearfix" v-if="loadingCreate === true">
          <b-spinner class="float-right" label="Floated Right"></b-spinner>
        </div>
        <b-row>
          <b-col>
            <b-form-group label="KODAM I BB" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="KODAM II SWJ" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="KODAM III SLW" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="KODAM IV DIP" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="KODAM V BRW" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="KODAM VI MLW" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="KODAM IX UDY" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="KODAM XII TPR" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="KODAM XIII MDK" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="KODAM XIV HSN" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="KODAM XVI PTM" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="KODAM XVII CEN" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="KODAM XVIII KSR" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="KODAM JAYA" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="KODAM IM" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="PUSSENIF" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="PUSSENKAV" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="PUSSENARMED" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="PUSSENARHANUD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="PUSZIAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="KOPASSUS" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="KOSTRAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="KODIKLATAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="DISADAAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="DISLAIKAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="DISJARAHAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="DISJASAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="DISINFOLAHTAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>

            <b-form-group label="DISLITBANGAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="DISPSIAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="DISBINTALAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="DISPENAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="DITKUMAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="DITKUAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="DITTOPAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="DITAJENAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="RSPAD GS" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="PUSKESAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="PUSBEKANGAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="PUSPALAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="PUSHUBAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="PUSPENERBAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="PUSINTELAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="PUSTERAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="PUSPOMAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="PUSSANSIAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="SECAPA AD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="SESKOAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="AKMIL" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="ITJENAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
            <b-form-group label="MABESAD" label-for="file">
              <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                id="file"
                v-model="file"
                placeholder="Masukkan file"
              ></b-form-file>
              <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button>
            </div>
              <b-form-text class="text-danger" v-if="errorFile">
                File Wajib Diisi!
              </b-form-text>
              <p class="mt-2 text-dark">Format File: Excel</p>
            </b-form-group>
          </b-col>
        </b-row>
      </form>
    </b-modal>
  </div>