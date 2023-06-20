import { makeAutoObservable } from "mobx";

class loadingService {
  private loadingCounter = 0;

  constructor() {
    makeAutoObservable(this);
  }

  public setIsLoading(): void {
    this.loadingCounter++;
  }

  public releaseLoading(): void {
    this.loadingCounter--;
  }

  public get isLoading(): boolean {
    return this.loadingCounter > 0;
  }
}

export const LoadingService = new loadingService();
