import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeftIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Contacts',
        href: '/contacts',
    },
    {
        title: 'Create',
        href: '/contacts/create',
    },
];

export default function CreateContact() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        mobile: '',
        address: '',
    });

    const handleSubmit = (e: React.FormEvent)=>{
        e.preventDefault();
        post('contacts');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Contact" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <div className='flex justify-between items-center'>
                            <CardTitle>Create Contact</CardTitle>
                            <Link href='/contacts'>
                                <Button variant='outline'>
                                    <ArrowLeftIcon className='w-4 h-4' />
                                    Back
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <div>
                                <Label htmlFor='name'>Name <span className='text-red-400'>*</span></Label>
                                <Input
                                    id='name'
                                    name='name'
                                    type='text'
                                    placeholder='Enter your name'
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && <p className='text-red-500'>{errors.name}</p>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor='email'>Email</Label>
                                    <Input
                                        id='email'
                                        name='email'
                                        type='email'
                                        placeholder='Enter email'
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    {errors.email && <p className='text-red-500'>{errors.email}</p>}
                                </div>
                                <div>
                                    <Label htmlFor='mobile'>Mobile <span className='text-red-400'>*</span></Label>
                                    <Input
                                        id='mobile'
                                        name='mobile'
                                        type='text'
                                        placeholder='Enter mobile number'
                                        value={data.mobile}
                                        onChange={(e) => setData('mobile', e.target.value)}
                                        required
                                    />
                                    {errors.mobile && <p className='text-red-500'>{errors.mobile}</p>}
                                </div>
                            </div>
                            <div>
                                <Label htmlFor='address'>Address</Label>
                                <Textarea
                                    id='address'
                                    name='address'
                                    placeholder='Enter address'
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                />
                                {errors.address && <p className='text-red-500'>{errors.address}</p>}
                            </div>
                            <div>
                                <Button type='submit'>
                                    Save
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
