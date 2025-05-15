import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { EditIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Contacts',
        href: '/contacts',
    },
];

interface Contact {
    id: number;
    name: string;
    email: string;
    mobile: string;
    address: string;
    user_id: number;
    created_at: string;
    can: {
        update: boolean;
        delete: boolean;
    };
}

export default function Contacts({ contacts, auth }: { contacts: { data: Contact[] }, auth: any }) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteContactId, setDeleteContactId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        // if (confirm('Are you sure you want to delete this contact?')) {
        //     router.delete(`/contacts/${id}`);
        // }
        setDeleteDialogOpen(true);
        setDeleteContactId(id);
    };

    const handleConfirmDelete = () => {
        router.delete(`/contacts/${deleteContactId}`);
        setDeleteDialogOpen(false);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contacts" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Contacts</h1>
                    {auth.can.contacts.create && (<Link href="contacts/create">
                        <Button>
                            <PlusIcon className="h-4 w-4" />
                            Add Contact
                        </Button>
                    </Link>)}
                </div>
                <div className="flex flex-col gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>All Contacts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4">
                                <Table>
                                    <TableCaption>A list of your recent invoices.</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">#</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Mobile</TableHead>
                                            <TableHead>Address</TableHead>
                                            <TableHead>Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {contacts.data.map((contact) => (
                                            <TableRow key={contact.id}>
                                                <TableCell className="font-medium">{contact.id}</TableCell>
                                                <TableCell>{contact.name}</TableCell>
                                                <TableCell>{contact.email}</TableCell>
                                                <TableCell>{contact.mobile}</TableCell>
                                                <TableCell>{contact.address}</TableCell>
                                                <TableCell>
                                                {contact.can.update && (<Link href={`/contacts/${contact.id}/edit`}>
                                                        <Button variant="outline">
                                                            <EditIcon className="h-4 w-4" />
                                                        </Button>
                                                    </Link>)}
                                                    {contact.can.delete && (<Button variant="outline" onClick={() => handleDelete(contact.id)}>
                                                        <TrashIcon className="h-4 w-4" />
                                                    </Button>)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your contact and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleConfirmDelete}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
