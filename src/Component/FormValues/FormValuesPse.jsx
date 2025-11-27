import {Button} from "@nextui-org/react";
import pdf from "../../Image/contracto.pdf"

const FormValuesPse =({handleSubmit,formErrors,handleChange,formValues,loading,banks})  =>{

    return (<form onSubmit={handleSubmit}>

                 <div>
                    <label className="block text-sm text-gray-700 mb-2">
                        Escoge tu Banco para continuar con el pago.
                    </label>
                    <select
                    name="banks"
                    value={formValues.banks}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 bg-white">
                        {banks?.map((bank) => (
                        <option key={bank.bankCode} value={bank.bankCode}>
                            {bank.bankName}
                        </option>
                        ))}
                
                    </select>
                        {formErrors.banks && <p className="text-red-500 text-xs">{formErrors.banks}</p>}
                    </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                                <input
                                    name="name"
                                    type="text"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    placeholder="Nombre"
                                    value={formValues.name}
                                    onChange={handleChange}
                                />
                                {formErrors.name && <p className="text-red-500 text-xs">{formErrors.name}</p>}
                            </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Apellido</label>
                            <input
                                name="apellido"
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                placeholder="Apellido"
                                value={formValues.apellido}
                                onChange={handleChange}
                            />
                            {formErrors.apellido && <p className="text-red-500 text-xs">{formErrors.apellido}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                name="email"
                            
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                placeholder="Email"
                                value={formValues.email}
                                onChange={handleChange}
                            />
                            {formErrors.email && <p className="text-red-500 text-xs">{formErrors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Número de teléfono</label>
                            <input
                                name="phone"
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                placeholder="Número de teléfono"
                                value={formValues.phone}
                                onChange={handleChange}
                            />
                            {formErrors.phone && <p className="text-red-500 text-xs">{formErrors.phone}</p>}
                        </div>
                    </div>
                    <div>
                    </div>
                    <div className=" mx-auto  rounded-md ">
                        <div className="mb-4">
                            <label className="flex items-center">
                                <input 
                                    name='termsAccepted'
                                    value={formValues.termsAccepted}
                                    onChange={handleChange}
                                    type="checkbox" 
                                    className="form-checkbox h-5 w-5 text-gray-600"
                                />
                                <span className="ml-2 text-gray-700">He leído y acepto las <a target="_blank" href={pdf} className="text-black">condiciones generales</a> (*)</span>
                            </label>
                            {formErrors.termsAccepted && <p className="text-red-500 text-xs">{formErrors.termsAccepted}</p>}
                            </div>
                            <div className="mb-4">
                            <label className="flex items-center">
                                <input 
                                name='siteTermsAccepted'
                                value={formValues.siteTermsAccepted}
                                onChange={handleChange}
                                type="checkbox" 
                                className="form-checkbox h-5 w-5 text-gray-600"
                                />
                                <span className="ml-2 text-gray-700">He leído y acepto los <a  target="_blank" href={pdf} className="text-black">Términos y Condiciones del sitio web</a> (*)</span>
                            </label>
                            {formErrors.siteTermsAccepted && <p className="text-red-500 text-xs">{formErrors.siteTermsAccepted}</p>}
                             <Button 
                            disabled={loading} 
                            type="submit" 
                            className={`w-full text-white py-2 bg-black px-5  rounded hover:bg-gray-800`} 
                            >
                            {loading ? "Cargando reserva" : "Finaliza tu reserva" } 
                            </Button>
                            </div>
                        </div>
                    </form>)

}

export default FormValuesPse