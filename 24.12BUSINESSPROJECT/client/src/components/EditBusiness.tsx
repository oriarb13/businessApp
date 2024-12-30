import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditBusiness } from "@/hooks/tan-stack/useBuisnesses";
import { IBusiness } from "@/types/Type";
import { useNavigate } from "react-router-dom";

interface EditBusinessDialogProps {
  business: IBusiness; 
}

const EditBusinessDialog: React.FC<EditBusinessDialogProps> = ({
  business,
}) => {
  const { mutate: editBusiness, isLoading } = useEditBusiness();
  const [formData, setFormData] = useState({
    name: business.name,
    description: business.description,
    category: business.category,
    img: business.img,
  });
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    editBusiness({
      id: business._id,
      businessData: formData,
    });
    navigate("/home");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Business</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Edit Business</DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter business name"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter business description"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Enter business category"
            />
          </div>
          <div>
            <Label htmlFor="img">Image URL</Label>
            <Input
              id="img"
              name="img"
              value={formData.img}
              onChange={handleInputChange}
              placeholder="Enter business image URL"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBusinessDialog;
