export class FileUtil {

  public static convertFileToBase64(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  public static convertBase64ToFile(base64: any, fileName: string): File {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let count = bstr.length;
    const u8arr = new Uint8Array(count);

    while (count--) {
      u8arr[count] = bstr.charCodeAt(count);
    }

    return new File([u8arr], fileName, { type: mime });
  }

}
