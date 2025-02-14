import { useState } from 'react';
import CommonForm from '../common/form';
import { DialogContent } from '../ui/dialog';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

const initialFormData = {
  status: '',
};

function AdminOrdersDetailsView() {
  const [formData, setFormData] = useState(initialFormData);

  function handleUpdateStatus(event){
    event.preventDefault()
  }

  return (
    <DialogContent clasName=" sm:max-w[600px]">
      <div className=" grid gap-6">
        <div className="grid gap-2">
          <div className=" flex mt-6 items-center justify-between">
            <p className=" font-medium">Order Id</p>
            <Label>123456</Label>
          </div>
          <div className=" flex mt-2 items-center justify-between">
            <p className=" font-medium">Order Date</p>
            <Label>29/01/2025</Label>
          </div>
          <div className=" flex mt-2 items-center justify-between">
            <p className=" font-medium">Order Price</p>
            <Label>₹500</Label>
          </div>
          <div className=" flex mt-2 items-center justify-between">
            <p className=" font-medium">Order Status</p>
            <Label>In Progress</Label>
          </div>
        </div>
        <Separator />
        <div className=" grid gap-4">
          <div className=" grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className=" grid gap-3">
              <li className=" flex items-center justify-between">
                <span>Product One</span>
                <span>₹100</span>
              </li>
            </ul>
          </div>
        </div>
        <div className=" grid gap-4">
          <div className=" grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className=" grid gap-0.5 text-muted-foreground">
              <span>Harish</span>
              <span>Address</span>
              <span>City</span>
              <span>Pincode</span>
              <span>Phone</span>
              <span>notes</span>
            </div>
          </div>
        </div>
        <div>
          <CommonForm
            formControls={[
              {
                label: 'Status',
                name: 'Status',
                componentType: 'select',
                options: [
                  { id: 'pending', label: 'Pending' },
                  { id: 'inProcess', label: 'In Process' },
                  { id: 'inShopping', label: 'In Shopping' },
                  { id: 'delivered', label: 'Delivered' },
                  { id: 'rejected', label: 'Rejected' },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={'Update Order Status'}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrdersDetailsView;
