import { ReceiptUpload } from "../receipt-upload";

export default function ReceiptUploadExample() {
  return (
    <div className="max-w-md p-4">
      <ReceiptUpload
        onUpload={(file) => console.log("Uploaded:", file.name)}
        onOCRComplete={(data) => console.log("OCR Data:", data)}
      />
    </div>
  );
}
