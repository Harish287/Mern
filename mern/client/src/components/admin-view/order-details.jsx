import { DialogContent } from '../ui/dialog';
import { Label } from '../ui/label';

function AdminOrdersDetailsView() {
  return (
    <DialogContent clasName=" sm:max-w[600px]">
      <div className=" grid gap-6">
        <div className="grid gap-2">
          <div className=" flex items-center justify-between">
            <p className=" font-medium">Order Id</p>
            <Label>123456</Label>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrdersDetailsView;
