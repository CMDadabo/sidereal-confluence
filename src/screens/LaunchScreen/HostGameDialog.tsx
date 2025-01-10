import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Spinner from "@/components/ui/spinner";
import { ConnectionStateContext } from "@/providers/ConnectionStateProvider";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useContext, useEffect, useState } from "react";

const HostGameDialog = ({
  onSubmit,
  matchId,
}: {
  onSubmit: () => void;
  matchId: string;
}) => {
  enum HostGameDialogState {
    Idle,
    Submitting,
    Success,
    Error,
  }

  const [open, setOpen] = useState(false);
  const [modalState, setModalState] = useState(HostGameDialogState.Idle);
  const { isConnected } = useContext(ConnectionStateContext);

  useEffect(() => {
    if (open) onSubmit();
  }, [open, onSubmit]);

  useEffect(() => {
    if (isConnected) setModalState(HostGameDialogState.Success);
  }, [isConnected, setModalState, HostGameDialogState.Success]);

  const handleSubmit = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">Host Game</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Host Game</DialogTitle>
          {modalState === HostGameDialogState.Idle && (
            <>
              <DialogDescription>Preparing game... </DialogDescription>
              <Spinner />
            </>
          )}
          {modalState === HostGameDialogState.Success && (
            <DialogDescription>
              <>
                Match created successfully. Friends can join using this Match
                ID:
                <pre>{matchId}</pre>
              </>
            </DialogDescription>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default HostGameDialog;
