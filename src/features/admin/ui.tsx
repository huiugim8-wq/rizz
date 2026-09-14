'use client';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
const buttonVariants = cva('adminBtn');
export function Button({
  tone = 'default',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { tone?: 'default' | 'primary' | 'danger' }) {
  return (
    <button className={twMerge(clsx(buttonVariants(), className))} data-tone={tone} {...props} />
  );
}
export function Dialog({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="adminOverlay" />
        <DialogPrimitive.Content className="adminDialog" aria-describedby={undefined}>
          <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
          {children}
          <DialogPrimitive.Close asChild>
            <Button>닫기</Button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
