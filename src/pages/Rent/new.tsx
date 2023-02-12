import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom"
import { Button } from "../../components/Button";
import { FormError } from "../../components/FormError";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import Navbar from "../../components/Navbar";
import Select from "../../components/Select";
import { apiProperty } from "../../services/api";

interface Rent {
  Customer: string
  Property: string
  StartDate: string
  EndDate: string
  Value: number
  Amount: number
  ExpirationDay: number
  Iptu: number
  Description: string
}

export function NewRent() {
  const [generalErrors, setGeneralErrors] = useState<string[]>([])

  //const [files, setFiles] = useState<FileList | null>(null)

 // const [virtualFiles, setVirtualFiles] = useState<FileList | null>(null)

  const history = useHistory()

  const [data, setData] = useState({
    Customer: "",
    Property: "",
    StartDate: "",
    EndDate: "",
    Value: 0,
    Amount: 0,
    ExpirationDay: 0,
    Iptu: 0,
    Description: ""
  } as Rent);

  //async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    //e.preventDefault();
    // trimming data specific for each type
    // if (data === 'house') {
    //alert('It works!')
    // } else if (data.Tipo === 'ground') {
    //   const { Bloco, Quartos, ...groundData } = data
    //   setData(groundData)
   // }

  //   if (await validate()) {
  //     try {
  //       const dataBackend = {
  //         area: data['Área'],
  //         name: data['Nome'],
  //         neighborhood: data['Bairro'],
  //         adress: data['Endereço'],
  //         codAddress: 0,
  //         city: data['Cidade'],
  //         description: data['Descrição'],
  //         state: data['Estado'],
  //         price: data['Preço'],
  //         number: data['Número'],
  //         amount: data['Quantidade'],
  //       }
  //       let toSend = {}
  //       if (data.Tipo === 'house') {
  //         toSend = { ...dataBackend, rooms: data['Quartos'] }
  //       } else if (data.Tipo === 'apartment') {
  //         toSend = { ...dataBackend, rooms: data['Quartos'], block: data['Bloco'] }
  //       } else {
  //         toSend = { ...dataBackend }
  //       }
  //       const r = await apiProperty.post(`/${data.Tipo}`, toSend);
  //       console.log(r.data);
  //       let formData = new FormData();
  //       let formDataVirtual = new FormData();
  //       //@ts-expect-error
  //       formData.append("img1", files[0]);
  //       //@ts-expect-error
  //       formData.append("img2", files[1]);
  //       //@ts-expect-error
  //       formData.append("img3", files[2]);

  //       //@ts-expect-error
  //       formDataVirtual.append("img1", virtualFiles[0]);
  //       //@ts-expect-error
  //       formDataVirtual.append("img2", virtualFiles[1]);
  //       //@ts-expect-error
  //       formDataVirtual.append("img3", virtualFiles[2]);

  //       await apiProperty.post(
  //         `/property/upload/${r.data.id}`,
  //         formData, {
  //         headers: { 'Content-Type': 'multipart/form-data;' }
  //       })

  //       await apiProperty.post(
  //         `/property/upload/virtual/${r.data.id}`,
  //         formDataVirtual, {
  //         headers: { 'Content-Type': 'multipart/form-data;' }
  //       })

  //       toast('Imóvel cadastrado com sucesso.', { autoClose: 2500, type: 'success' })
  //       setTimeout(() => {
  //         history.push('/')
  //       }, 2500)
  //     } catch (error) {
  //       toast('Algo deu errado, tente novamente.', { autoClose: 2500, type: 'error' })
  //     }
  //   }
  // }

  // async function validate() {
  //   try {
  //     await schema.validate(data, { abortEarly: false })
  //     setGeneralErrors([])
  //     if (!files?.item(0)) {
  //       toast('Deve existir ao menos 1 foto do imóvel.', { autoClose: 2500, type: 'error' })
  //       return false
  //     }
  //     return true
  //   } catch (error) {
  //     // @ts-expect-error
  //     setGeneralErrors(error.errors)
  //     return false
  //   }
  // }

  // function handleFiles(e: React.ChangeEvent<HTMLInputElement>, isVirtual = false) {
  //   isVirtual ? setVirtualFiles(null) : setFiles(null);
  //   if (e.target.files) {
  //     let list = new DataTransfer()
  //     for (let index = 0; index < e.target.files.length; index++) {
  //       if (index > 2) break
  //       // @ts-expect-error
  //       list.items.add(e.target.files.item(index))
  //     }
  //     isVirtual ? setVirtualFiles(list.files) : setFiles(list.files);
  //   }
  // }

  // function updateFileList(f: FileList, toRemove: number, isVirtual = false) {
  //   let list = new DataTransfer()
  //   for (let index = 0; index < f.length; index++) {
  //     if (index === toRemove) continue
  //     list.items.add(f[index])
  //   }
  //   isVirtual ? setVirtualFiles(list.files) : setFiles(list.files);
  // }

  return (
    <>
      <div className="pb-10 max-w-7xl m-auto h-screen">
        <div className="flex flex-col gap-12 items-center">
          <Navbar></Navbar>
          <section
            className="flex items-baseline gap-6 max-h-192 max-w-7xl
            overflow-y-auto scrollbar-thumb-rounded-full scrollbar-thin
            scrollbar-thumb-red-400 scrollbar-track-transparent"
          >
            {/* {generalErrors[0] &&
              (<>
                <div className="bg-red-100 dark:bg-gray-800 p-3 rounded-lg mb-3 max-h-112 overflow-y-auto
                scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-red-400">
                  <h3 className="text-red-800 dark:text-red-400 font-bold">Campos inválidos:</h3>
                  {generalErrors.map((e, index) => (
                    <FormError className="text-red-500 dark:text-red-200" key={index}>{e}</FormError>
                  ))}
                </div>
              </>)} */}
            <div>
              <ToastContainer />
              <div className="flex max-w-3xl shadow-md rounded-xl
                justify-around items-center gap-12 bg-white dark:bg-gray-800
                p-5 mb-8 dark:text-white"
              >
                <div className="flex flex-col">
                  <p className="text-xl text-center mb-5">Novo Aluguel</p>
                  <form
                    //onSubmit={handleSubmit}
                    className="grid grid-cols-6 items-start gap-3 px-5"
                  >
                    {/* Row 1 */}
                    <div className="grid col-span-3">
                      <Label font="light" for="customer">Cliente</Label>
                      <input 
                        value={data.Customer} 
                        onChange={(e) => 
                        setData({ ...data, Customer: e.target.value })}
                        id="customer"
                        type="text"
                      />
                    </div>
                    <div className="grid col-span-3">
                      <Label font="light" for="property">Propriedade</Label>
                      <Input
                        value={data.Property}
                        onChange={(e) =>
                          setData({ ...data, Property: e.target.value })
                        }
                        id="property"
                        type="text"
                      />
                    </div>
                    {/* Row 2 */}
                    <div className="grid col-span-2">
                      <Label font="light" for="startDate">Data de Início</Label>
                      <Input
                        value={data.StartDate}
                        onChange={(e) =>
                          setData({ ...data, StartDate: e.target.value })
                        }
                        id="startDate"
                        type="date"
                      />
                    </div>
                    <div className="grid col-span-2">
                      <Label font="light" for="endDate">Data de Fim</Label>
                      <Input
                        value={data.EndDate}
                        onChange={(e) =>
                          setData({ ...data, EndDate: e.target.value })
                        }
                        id="endDate"
                        type="date"
                      />
                    </div>
                    <div className="grid col-span-2">
                      <Label font="light" for="value">Preço</Label>
                      <Input
                        value={data.Value}
                        onChange={(e) =>
                          setData({ ...data, Value: Number(e.target.value) })
                        }
                        id="value"
                        type="number"
                      />
                    </div>
                    {/* Row 3 */}
                    <div className="grid col-span-2">
                      <Label font="light" for="amount">Quantidade</Label>
                      <Input
                        value={data.Amount}
                        onChange={(e) =>
                          setData({ ...data, Amount: Number(e.target.value) })
                        }
                        id="amount"
                        type="number"
                      />
                    </div>
                    <div className="grid col-span-2">
                      <Label font="light" for="expirationDay">Dia de vencimento</Label>
                      <Input
                        value={data.ExpirationDay}
                        onChange={(e) =>
                          setData({ ...data, ExpirationDay: Number(e.target.value) })
                        }
                        id="expirationDay"
                        type="number"
                      />
                    </div>
                    <div className="grid col-span-2">
                      <Label font="light" for="iptu">IPTU</Label>
                      <Input
                        value={data.Iptu}
                        onChange={(e) =>
                          setData({ ...data, Iptu: Number(e.target.value) })
                        }
                        id="iptu"
                        type="text"
                      />
                    </div>
                    {/* // <div className="grid col-span-1">
                    //   <Label font="light" for="state">Estado</Label>
                    //   <Input 
                    //     value={data.Estado}
                    //     onChange={(e) =>
                    //       setData({ ...data, Estado: e.target.value })
                    //     }
                    //     id="state"
                    //     type="text"
                    //   />
                    // </div> */}
                    {/* Row 4 */}
                    <div className="grid col-span-6">
                      <Label font="light" for="description">Descrição</Label>
                      <Input
                        value={data.Description}
                        onChange={(e) =>
                          setData({ ...data, Description: e.target.value })
                        }
                        id="description"
                        type="text"
                      />
                    </div>
                    {/* <div className="grid col-span-1">
                      <Label font="light" for="price">Preço</Label>
                      <Input
                        value={data.Preço}
                        onChange={(e) =>
                          setData({ ...data, Preço: Number(e.target.value) })
                        }
                        id="price"
                        type="number"
                      />
                    </div>
                    <div className={`grid col-span-${data.Tipo === 'apartment' ? '3' : '4'}`}>
                      <Label font="light" for="description">Descrição</Label>
                      <Input
                        value={data.Descrição}
                        onChange={(e) =>
                          setData({ ...data, Descrição: e.target.value })
                        }
                        id="description"
                        type="text"
                      />
                    </div>
                    <div className={`grid col-span-1`}>
                      <Label font="light" for="quantity">Quantidade</Label>
                      <Input
                        value={data.Quantidade}
                        onChange={(e) =>
                          setData({ ...data, Quantidade: Number(e.target.value) })
                        }
                        id="quantity"
                        type="number"
                      />
                    </div> */}
                    {/* Row 5 */}
                    <div className="grid col-span-2">
                      <Button type="submit">
                        Alugar
                      </Button>
                    </div>
                    {/* <div className="grid col-span-1"></div>
                    <div className="grid col-span-2 cursor-pointer">
                      <Button color="green" className="relative cursor-pointer" type="button">
                        <>
                          <FontAwesomeIcon icon="plus" />
                          Fotos
                          <input
                            className="text-0 absolute z-10 cursor-pointer opacity-0 right-0 top-0 h-full w-full text-xs"
                            type="file"
                            multiple={true}
                            // @ts-ignore
                            onChange={(e) => handleFiles(e)}
                          />
                        </>
                      </Button>
                    </div> */}
                    {/* <div className="grid col-span-2 cursor-pointer">
                      <Button color="blue" className="relative cursor-pointer" type="button">
                        <>
                          <FontAwesomeIcon icon="plus" />
                          Visita Virtual
                          <input
                            className="text-0 absolute z-10 cursor-pointer opacity-0 right-0 top-0 h-full w-full text-xs"
                            type="file"
                            multiple={true}
                            // @ts-ignore
                            onChange={(e) => handleFiles(e, true)}
                          />
                        </>
                      </Button>
                    </div> */}
                    {/* <div className="flex col-span-6 w-full gap-2">
                      {files && Array.from(files).map((file, index) => (
                        <>
                          <div className="grid col-span-1 cursor-pointer newPropertyFileButton relative">
                            <div className="tooltip bg-pink-100 text-center rounded-lg text-sm p-1 max-h-14 absolute overflow-hidden -mt-16 z-10 w-36 -left-5 break-words dark:text-white dark:bg-pink-500 leading-tight">
                              {file.name}
                            </div>
                            <Button color="green" hover="red" className="cursor-pointer" type="button" onClick={() => updateFileList(files, index)}>
                              <>
                                <FontAwesomeIcon icon="file-image" className="fa-hover-hidden" />
                                <FontAwesomeIcon icon="trash" className="fa-hover-show" />
                                <p className="">{file.name.substring(0, 5)}...</p>
                              </>
                            </Button>
                          </div>
                        </>
                      ))}
                      <br />
                      {virtualFiles && Array.from(virtualFiles).map((virtualFile, index) => (
                        <>
                          <div className="grid col-span-1 cursor-pointer newPropertyFileButton relative">
                            <div className="tooltip bg-pink-100 text-center rounded-lg text-sm p-1 max-h-14 absolute overflow-hidden -mt-16 z-10 w-36 -left-5 break-words dark:text-white dark:bg-pink-500 leading-tight">
                              {virtualFile.name}
                            </div>
                            <Button color="blue" hover="red" className="cursor-pointer" type="button" onClick={() => updateFileList(virtualFiles, index, true)}>
                              <>
                                <FontAwesomeIcon icon="file-image" className="fa-hover-hidden" />
                                <FontAwesomeIcon icon="trash" className="fa-hover-show" />
                                <p className="">{virtualFile.name.substring(0, 5)}...</p>
                              </>
                            </Button>
                          </div>
                        </>
                      ))} 
                    </div>*/}
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
