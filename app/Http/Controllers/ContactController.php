<?php

namespace App\Http\Controllers;

use App\Http\Resources\ContactResource;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->user()->cannot('viewAny', Contact::class)) {
            abort(403);
        }

        $contacts = Contact::query();
        if($request->user()->role == 'user')
        {
            $contacts = $contacts->where('user_id', $request->user()->id);
        }
        $contacts = $contacts->latest()->get();
        return Inertia::render('contacts/index', [
            'contacts' => ContactResource::collection($contacts),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        if ($request->user()->cannot('create', Contact::class)) {
            abort(403);
        }
        return Inertia::render('contacts/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->user()->cannot('create', Contact::class)) {
            abort(403);
        }
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'mobile' => 'required',
            'address' => 'required',
        ]);

        $validatedData['user_id'] = $request->user()->id;
        Contact::create($validatedData);

        return redirect()->route('contacts.index')->with(['success' , 'Contact created successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Contact $contact)
    {
        if ($request->user()->cannot('update', $contact)) {
            abort(403);
        }
        return Inertia::render('contacts/edit', [
            'contact' => $contact,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contact $contact)
    {
        if ($request->user()->cannot('update', $contact)) {
            abort(403);
        }

        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'nullable|email',
            'mobile' => 'required|numeric|digits:11|unique:contacts,mobile,' . $contact->id,
            'address' => 'required',
        ]);

        $contact->update($validatedData);

        return redirect()->route('contacts.index')->with(['success' , 'Contact updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Contact $contact)
    {
        if ($request->user()->cannot('delete', $contact)) {
            abort(403);
        }

        $contact->delete();

        return redirect()->route('contacts.index')->with(['success', 'Contact deleted successfully']);
    }
}
