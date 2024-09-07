import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
import Link from "next/link";
import { LayoutDashboard, FlaskConical, Activity, Paperclip } from "lucide-react";


const Sidebar = () => {
    return (
            <Command className="sticky w-52 bg-secondary rounded-2xl h-auto">
                <CommandInput placeholder="Type to search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem>
                            <LayoutDashboard className="mr-2 h-4 w-4" />    
                            <Link href='/' >Dashboard</Link>
                        </CommandItem>
                        <CommandItem>
                            <Activity className="mr-2 h-4 w-4" />   
                            <Link href='/' >Scenarios</Link> 
                        </CommandItem>
                        <CommandItem>
                            <FlaskConical className="mr-2 h-4 w-4" /> 
                            <Link href='/' >Test Cases</Link>   
                        </CommandItem>
                    </CommandGroup>

                    <CommandSeparator />
                </CommandList>
                <CommandGroup heading="Recent files">
                    <CommandItem>
                        <Paperclip className="mr-2 h-4 w-4" />
                        <Link href='/' >test_report.json</Link>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                
                <CommandGroup heading="Upload File">
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-[90%] m-2 h-auto border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className="mb-2 text-sm text-center text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">[JSON format only]</p>
                                </div>
                                <input id="dropzone-file" type="file" accept=".json" className="hidden" />
                            </label>
                        </div> 

                    </CommandGroup>
            </Command>
     );
}
 
export default Sidebar;