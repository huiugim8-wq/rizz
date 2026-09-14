'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from './auth-client';
import { AuthCard } from './auth-card';
import { Button } from './ui';

type View = 'demo' | 'login' | 'signup';
type DemoAccount = { name: string; email: string; password: string };

function authError(view: View) {
  return view === 'signup'
    ? '가입을 완료하지 못했습니다. 입력 내용을 확인해 주세요.'
    : '이메일 또는 비밀번호를 확인해 주세요.';
}

export function AdminAuthEntry({
  configured,
  failed,
  demo,
}: {
  configured: boolean;
  failed: boolean;
  demo: DemoAccount;
}) {
  const router = useRouter();
  const [view, setView] = useState<View>('demo');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(
    failed ? 'Google 로그인을 완료하지 못했습니다. 다시 시도해 주세요.' : '',
  );
  const [copied, setCopied] = useState<'email' | 'password' | ''>('');

  function changeView(next: View) {
    setView(next);
    setMessage('');
  }

  async function googleSignIn() {
    setBusy(true);
    setMessage('');
    try {
      const result = await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/admin',
        newUserCallbackURL: '/admin',
        errorCallbackURL: '/admin/login?error=google',
      });
      if (result.error) {
        setMessage('Google 로그인을 시작하지 못했습니다. 잠시 후 다시 시도해 주세요.');
        setBusy(false);
      }
    } catch {
      setMessage('서버에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.');
      setBusy(false);
    }
  }

  async function submitCredentials(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') ?? '')
      .trim()
      .toLowerCase();
    const password = String(form.get('password') ?? '');
    const name = String(form.get('name') ?? '').trim();

    if (view === 'signup' && name.length < 2) {
      setMessage('이름은 2자 이상 입력해 주세요.');
      return;
    }
    if (password.length < 8) {
      setMessage('비밀번호는 8자 이상 입력해 주세요.');
      return;
    }
    if (view === 'signup' && password !== String(form.get('passwordConfirm') ?? '')) {
      setMessage('비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    if (view === 'signup') {
      setBusy(true);
      setMessage('');
      try {
        const result = await authClient.signUp.email({
          name,
          email,
          password,
          callbackURL: '/admin',
        });
        if (result.error) {
          setMessage(authError(view));
          setBusy(false);
          return;
        }
        router.push('/admin');
        router.refresh();
      } catch {
        setMessage('서버에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.');
        setBusy(false);
      }
      return;
    }
    await credentialSignIn(email, password);
  }

  async function credentialSignIn(email: string, password: string) {
    setBusy(true);
    setMessage('');
    try {
      const result = await authClient.signIn.email({ email, password, callbackURL: '/admin' });
      if (result.error) {
        setMessage('이메일 또는 비밀번호를 확인해 주세요.');
        setBusy(false);
        return;
      }
      router.push('/admin');
      router.refresh();
    } catch {
      setMessage('서버에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.');
      setBusy(false);
    }
  }

  async function copyCredential(type: 'email' | 'password', value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(type);
      window.setTimeout(() => setCopied(''), 1600);
    } catch {
      setMessage('복사하지 못했습니다. 값을 길게 눌러 복사해 주세요.');
    }
  }

  return (
    <AuthCard title="관리자 포트폴리오">
      <div className="adminAuthBody">
        <div className="adminAuthTabs" role="tablist" aria-label="관리자 접속 방법">
          {(
            [
              ['demo', '체험 계정'],
              ['login', '관리자 로그인'],
              ['signup', '회원가입'],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={view === value}
              onClick={() => changeView(value)}
            >
              {label}
            </button>
          ))}
        </div>

        <p className="adminAuthLead">
          {view === 'demo'
            ? '면접 검토자는 준비된 계정으로 최고 관리자 기능을 바로 체험할 수 있습니다.'
            : view === 'login'
              ? '이미 승인받은 회사 관리자 계정으로 로그인합니다.'
              : '회사 관리자로 가입을 신청합니다. 가입 후 최고 관리자 승인이 필요합니다.'}
        </p>

        {message && (
          <p className="adminMessage" data-error="true" role="status">
            {message}
          </p>
        )}

        {view === 'demo' ? (
          <section className="adminDemoAccount" aria-labelledby="demo-account-title">
            <div>
              <strong id="demo-account-title">포트폴리오 체험 최고 관리자</strong>
              <small>소유권 이전을 제외한 관리자 기능을 모두 직접 사용할 수 있습니다.</small>
            </div>
            <dl>
              <div>
                <dt>아이디</dt>
                <dd>{demo.email}</dd>
                <button type="button" onClick={() => void copyCredential('email', demo.email)}>
                  {copied === 'email' ? '복사됨' : '복사'}
                </button>
              </div>
              <div>
                <dt>비밀번호</dt>
                <dd>{demo.password}</dd>
                <button
                  type="button"
                  onClick={() => void copyCredential('password', demo.password)}
                >
                  {copied === 'password' ? '복사됨' : '복사'}
                </button>
              </div>
            </dl>
            <Button
              tone="primary"
              className="adminDemoLogin"
              disabled={busy}
              onClick={() => void credentialSignIn(demo.email, demo.password)}
            >
              {busy ? '로그인 중…' : '체험 최고 관리자로 바로 로그인'}
            </Button>
          </section>
        ) : (
          <div className="adminAuthAccountPanel">
            <div className="adminAuthSectionHeading">
              <strong>{view === 'login' ? '관리자 로그인' : '관리자 회원가입'}</strong>
              <small>
                {view === 'login'
                  ? '승인된 회사 관리자 계정만 접속할 수 있습니다.'
                  : '가입을 마치면 최고 관리자가 계정을 확인하고 승인합니다.'}
              </small>
            </div>
            {!configured && (
              <p className="adminMessage" data-error="true" role="status">
                Google 로그인이 아직 설정되지 않았습니다.
              </p>
            )}
            <Button
              className="adminAuthProvider"
              disabled={!configured || busy}
              onClick={() => void googleSignIn()}
            >
              <span className="adminGoogleMark" aria-hidden="true">
                G
              </span>
              {busy
                ? 'Google로 이동 중…'
                : view === 'login'
                  ? 'Google 계정으로 로그인'
                  : 'Google 계정으로 회원가입'}
            </Button>
            <div className="adminAuthDivider" aria-hidden="true">
              <span>{view === 'login' ? '이메일로 로그인' : '이메일로 회원가입'}</span>
            </div>
            <form className="adminAuthForm" onSubmit={(event) => void submitCredentials(event)}>
              {view === 'signup' && (
                <label>
                  이름
                  <input name="name" autoComplete="name" minLength={2} required />
                </label>
              )}
              <label>
                이메일
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label>
                비밀번호
                <input
                  name="password"
                  type="password"
                  autoComplete={view === 'signup' ? 'new-password' : 'current-password'}
                  minLength={8}
                  maxLength={128}
                  required
                />
                {view === 'signup' && <small>8자 이상으로 입력해 주세요.</small>}
              </label>
              {view === 'signup' && (
                <label>
                  비밀번호 확인
                  <input
                    name="passwordConfirm"
                    type="password"
                    autoComplete="new-password"
                    minLength={8}
                    maxLength={128}
                    required
                  />
                </label>
              )}
              <Button tone="primary" disabled={busy} type="submit">
                {busy ? '처리 중…' : view === 'signup' ? '회원가입 신청' : '관리자 로그인'}
              </Button>
            </form>
          </div>
        )}
      </div>
    </AuthCard>
  );
}
