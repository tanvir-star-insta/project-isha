import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReceiptUploadProps {
  onUpload?: (file: File) => void;
  onOCRComplete?: (data: any) => void;
}

export function ReceiptUpload({ onUpload, onOCRComplete }: ReceiptUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);

    onUpload?.(selectedFile);

    setIsProcessing(true);
    setTimeout(() => {
      const mockOCRData = {
        amount: 245.50,
        date: new Date().toISOString().split("T")[0],
        vendor: "Acme Restaurant",
        category: "Meals",
      };
      onOCRComplete?.(mockOCRData);
      setIsProcessing(false);
      toast({
        title: "OCR Complete",
        description: "Receipt details extracted successfully",
      });
    }, 2000);
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(droppedFile);
      fileInputRef.current.files = dataTransfer.files;
      
      const syntheticEvent = {
        target: fileInputRef.current,
      } as React.ChangeEvent<HTMLInputElement>;
      handleFileChange(syntheticEvent);
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        data-testid="input-receipt-file"
      />

      {!preview ? (
        <Card
          className="border-dashed cursor-pointer hover-elevate"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-testid="dropzone-receipt"
        >
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <Upload className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm font-medium mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG or JPEG (max 10MB)
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              {isProcessing && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10 rounded-md">
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm font-medium">Processing with OCR...</p>
                  </div>
                </div>
              )}
              <img
                src={preview}
                alt="Receipt preview"
                className="w-full h-auto max-h-96 object-contain rounded-md"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleRemove}
                data-testid="button-remove-receipt"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>{file?.name}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
