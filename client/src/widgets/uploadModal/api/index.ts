const uploadReport = (formData: FormData, name: string) => {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         resolve({
            result: true,
            reportId: Math.floor(Math.random() * 1000)
         });
      }, 1000);
   });
};

export { uploadReport };
