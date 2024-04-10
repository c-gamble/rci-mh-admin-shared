import { Card, Typography } from "@material-tailwind/react";
import { Provider } from "../utils/providerType";
import { useRouter } from "next/navigation";
import { MdOutlineOpenInNew as OpenIcon } from "react-icons/md";
import { MdDelete as DeleteIcon } from "react-icons/md";

const TABLE_HEAD = ["Name", "Bio", "Website", "Zipcode", "Phone", "Email", "Tags", "Hidden", "Edit"];
 
export default function ProviderTable({ providers } : { providers: Provider[] }) {
    const router = useRouter();

    const handleDelete = async (id: string) => {
        const res = await fetch(`/api/providers/${id}`, {
            method: "DELETE",
        });

        if (res.status === 200) {
            alert("Provider successfully deleted!");
            window.location.reload();
        } else {
            alert("Something went wrong, please try again.");
        }
    }

  return (
    <Card className="h-full w-full overflow-scroll" placeholder="">
      <table className="w-full table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head, index) => (
              <th key={head} className={`border-b border-blue-gray-100 bg-blue-gray-50 p-4`}>
                <Typography
                    placeholder=""
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {providers.map((provider, index) => (
            <tr key={provider._id} className={`${index % 2 == 0 ? 'bg-white': 'bg-gray-200'}`}>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal" placeholder="">
                  {provider.name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal flex-wrap max-w-[200px]" placeholder="">
                  {provider.bio.substring(0, 200) + "..."}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal" placeholder="">
                  <a href={provider.website} target="_blank" className="text-blue-500 underline">Open</a>
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal" placeholder="">
                  {provider.zipcode}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal" placeholder="">
                  {provider.phone}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal" placeholder="">
                  {provider.email}
                </Typography>
              </td>               
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal" placeholder="">
                  {provider.tags.join(", ")}
                </Typography>
              </td>   
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal" placeholder="">
                    {provider.hidden ? "True" : "False"}
                </Typography>
              </td>                                          
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-medium flex flex-col justify-between items-center h-[100%]" placeholder="">
                    <a href={`/providers/${provider._id}`} target="_blank" className="flex items-center justify-center"><div className="p-[4px] rounded bg-blue-500 hover:bg-blue-700 transition-all duration-150 text-white"><OpenIcon size={16} /></div></a>
                    <button onClick={() => handleDelete(provider._id)} className="flex items-center justify-center mt-2"><div className="p-[4px] rounded bg-red-500 hover:bg-red-700 transition-all duration-150 text-white"><DeleteIcon size={16} /></div></button>
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
